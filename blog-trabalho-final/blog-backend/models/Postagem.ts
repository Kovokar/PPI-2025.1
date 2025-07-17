export class Postagem {
  private id: number;
  private titulo: string;
  private conteudo: string;
  private data: Date;
  private curtidas: number;
  private categorias: string[];
  private shares: number;

  constructor(
    id: number,
    titulo: string,
    conteudo: string,
    data: Date,
    curtidas: number,
    categorias: string[] = [],
    shares = 0
  ) {
    this.id = id;
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.data = data;
    this.curtidas = curtidas;
    this.categorias = categorias;
    this.shares = shares;
  }

  public getId(): number {
    return this.id;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getConteudo(): string {
    return this.conteudo;
  }

  public getData(): Date {
    return this.data;
  }

  public getCurtidas(): number {
    return this.curtidas;
  }

  public getCategorias(): string[] {
    return this.categorias;
  }

  public getShares(): number {
    return this.shares;
  }

  // Métodos setters para permitir alteração
  public setTitulo(titulo: string): void {
    this.titulo = titulo;
  }

  public setConteudo(conteudo: string): void {
    this.conteudo = conteudo;
  }

  public setData(data: Date): void {
    this.data = data;
  }

  public setCurtidas(curtidas: number): void {
    this.curtidas = curtidas;
  }

  public setCategorias(categorias: string[]): void {
    this.categorias = categorias;
  }

  public setShares(shares: number): void {
    this.shares = shares;
  }
}
