import type { Sql } from "postgres";
import { Usuario } from "../models/Usuario";

export class UserRepository {
  private sql: Sql;

  constructor(sql: Sql) {
    this.sql = sql;
  }

  async incluir(usuario: Usuario): Promise<Usuario> {
    const result = await this.sql`
      INSERT INTO users (name, email, password)
      VALUES (${usuario.getNome()}, ${usuario.getEmail()}, ${usuario.getSenha()})
      RETURNING *
    `;
    const row = result[0];
    return new Usuario(row.id, row.name, row.email, row.password);
  }

  async consultar(id: number): Promise<Usuario | undefined> {
    const result = await this.sql`
      SELECT * FROM users WHERE id = ${id}
    `;
    const row = result[0];
    if (row) {
      return new Usuario(row.id, row.name, row.email, row.password);
    }
    return undefined;
  }

  async consultarPorEmail(email: string): Promise<Usuario | undefined> {
    const result = await this.sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    const row = result[0];
    if (row) {
      return new Usuario(row.id, row.name, row.email, row.password);
    }
    return undefined;
  }

  async listar(): Promise<Usuario[]> {
    const result = await this.sql`
      SELECT * FROM users ORDER BY name ASC
    `;
    return result.map(
      (row) => new Usuario(row.id, row.name, row.email, row.password)
    );
  }

  async alterar(
    id: number,
    nome: string,
    email: string,
    senha: string
  ): Promise<boolean> {
    const result = await this.sql`
      UPDATE users SET name = ${nome}, email = ${email}, password = ${senha} WHERE id = ${id}
    `;
    return result.count > 0;
  }

  async excluir(id: number): Promise<boolean> {
    const result = await this.sql`
      DELETE FROM users WHERE id = ${id}
    `;
    return result.count > 0;
  }
}
