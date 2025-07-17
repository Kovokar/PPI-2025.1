import type { Sql } from "postgres"; // Importar o tipo Sql do 'postgres'
import { Postagem } from "../models/Postagem";

export class PostRepository {
  private sql: Sql; // Mudar o tipo de Pool para Sql

  constructor(sql: Sql) {
    this.sql = sql;
  }

  async incluir(postagem: Postagem): Promise<Postagem> {
    const result = await this.sql`
      INSERT INTO posts (title, content, post_date, likes, categories, shares)
      VALUES (
        ${postagem.getTitulo()},
        ${postagem.getConteudo()},
        ${postagem.getData()},
        ${postagem.getCurtidas()},
        ${postagem.getCategorias()},
        ${postagem.getShares()}
      )
      RETURNING *
    `;
    const row = result[0]; // postgres.js retorna um array de objetos
    return new Postagem(
      row.id,
      row.title,
      row.content,
      row.post_date,
      row.likes,
      row.categories,
      row.shares
    );
  }

  async alterar(
    id: number,
    titulo: string,
    conteudo: string,
    data: Date,
    curtidas: number,
    categorias: string[],
    shares: number
  ): Promise<boolean> {
    const result = await this.sql`
      UPDATE posts SET
        title = ${titulo},
        content = ${conteudo},
        post_date = ${data},
        likes = ${curtidas},
        categories = ${categorias},
        shares = ${shares}
      WHERE id = ${id}
    `;
    return result.count > 0; // postgres.js usa .count para linhas afetadas
  }

  async consultar(id: number): Promise<Postagem | undefined> {
    const result = await this.sql`
      SELECT * FROM posts WHERE id = ${id}
    `;
    const row = result[0];
    if (row) {
      return new Postagem(
        row.id,
        row.title,
        row.content,
        row.post_date,
        row.likes,
        row.categories,
        row.shares
      );
    }
    return undefined;
  }

  async excluir(id: number): Promise<boolean> {
    const result = await this.sql`
      DELETE FROM posts WHERE id = ${id}
    `;
    return result.count > 0;
  }

  async curtir(id: number): Promise<number | null> {
    const result = await this.sql`
      UPDATE posts SET likes = likes + 1 WHERE id = ${id} RETURNING likes
    `;
    if (result.count > 0) {
      return result[0].likes;
    }
    return null;
  }

  async incrementShares(id: number): Promise<number | null> {
    const result = await this.sql`
      UPDATE posts SET shares = shares + 1 WHERE id = ${id} RETURNING shares
    `;
    if (result.count > 0) {
      return result[0].shares;
    }
    return null;
  }

  async listar(search?: string, category?: string): Promise<Postagem[]> {
    let query = "SELECT * FROM posts";
    const conditions: string[] = [];
    const params: any[] = [];

    if (search) {
      conditions.push(
        `(title ILIKE $${params.length + 1} OR content ILIKE $${
          params.length + 1
        })`
      );
      params.push(`%${search}%`);
    }
    if (category) {
      conditions.push(`$${params.length + 1} = ANY(categories)`);
      params.push(category);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY post_date DESC";

    // Usar sql.query para queries dinâmicas com parâmetros posicionais
    const result = await this.sql.unsafe(query, ...params);
    return result.map(
      (row) =>
        new Postagem(
          row.id,
          row.title,
          row.content,
          row.post_date,
          row.likes,
          row.categories,
          row.shares
        )
    );
  }
}
