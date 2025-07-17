import type { Sql } from "postgres";
import { Comentario } from "../models/Comentario";

export class CommentRepository {
  private sql: Sql;

  constructor(sql: Sql) {
    this.sql = sql;
  }

  async addComment(comment: Comentario): Promise<Comentario> {
    const result = await this.sql`
      INSERT INTO comments (post_id, author, content, comment_date, likes)
      VALUES (
        ${comment.getPostId()},
        ${comment.getAutor()},
        ${comment.getConteudo()},
        ${comment.getData()},
        ${comment.getLikes()}
      )
      RETURNING *
    `;
    const row = result[0];
    return new Comentario(
      row.id,
      row.post_id,
      row.author,
      row.content,
      row.comment_date,
      row.likes
    );
  }

  async listCommentsByPostId(postId: number): Promise<Comentario[]> {
    const result = await this.sql`
      SELECT * FROM comments WHERE post_id = ${postId} ORDER BY comment_date DESC
    `;
    return result.map(
      (row) =>
        new Comentario(
          row.id,
          row.post_id,
          row.author,
          row.content,
          row.comment_date,
          row.likes
        )
    );
  }

  async updateComment(
    id: number,
    autor: string,
    conteudo: string
  ): Promise<boolean> {
    const result = await this.sql`
      UPDATE comments SET author = ${autor}, content = ${conteudo} WHERE id = ${id}
    `;
    return result.count > 0;
  }

  async deleteComment(id: number): Promise<boolean> {
    const result = await this.sql`
      DELETE FROM comments WHERE id = ${id}
    `;
    return result.count > 0;
  }

  async likeComment(id: number): Promise<number | null> {
    const result = await this.sql`
      UPDATE comments SET likes = likes + 1 WHERE id = ${id} RETURNING likes
    `;
    if (result.count > 0) {
      return result[0].likes;
    }
    return null;
  }
}
