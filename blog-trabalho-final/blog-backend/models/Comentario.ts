export class Comentario {
    private id: number
    private postId: number
    private autor: string
    private conteudo: string
    private data: Date
    private likes: number
  
    constructor(id: number, postId: number, autor: string, conteudo: string, data: Date, likes = 0) {
      this.id = id
      this.postId = postId
      this.autor = autor
      this.conteudo = conteudo
      this.data = data
      this.likes = likes
    }
  
    public getId(): number {
      return this.id
    }
  
    public getPostId(): number {
      return this.postId
    }
  
    public getAutor(): string {
      return this.autor
    }
  
    public getConteudo(): string {
      return this.conteudo
    }
  
    public getData(): Date {
      return this.data
    }
  
    public getLikes(): number {
      return this.likes
    }
  
    // Métodos setters
    public setAutor(autor: string): void {
      this.autor = autor
    }
  
    public setConteudo(conteudo: string): void {
      this.conteudo = conteudo
    }
  
    public setData(data: Date): void {
      this.data = data
    }
  
    public setLikes(likes: number): void {
      this.likes = likes
    }
  }
  