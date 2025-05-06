// 📦 Importações
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

// 🌐 Configurações
const BASE_URL = 'http://127.0.0.1:5500/paginas/';

// 🔍 Classe WebCrawler para encapsular a lógica de crawling
class WebCrawler {
  constructor() {
    this.visited = new Set();
    this.resultados = [];
    this.todosOsLinks = [];
  }

  // Método para buscar conteúdo de uma página
  async fetchPageContent(page) {
    const url = encodeURI(`${BASE_URL}${page}`);

    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const pageId = path.basename(page, '.html');
      const texts = [];
      const links = [];
      const textoCompleto = $('body').text().trim();

      $('a').each((_, el) => {
        const href = $(el).attr('href');
        const text = $(el).text().trim();

        if (href && !href.startsWith('#')) {
          texts.push(text);
          links.push(href);
          this.todosOsLinks.push(href);
        }
      });

      return {
        father: pageId,
        conteudo: texts,
        links,
        textoCompleto
      };
    } catch (error) {
      console.error(`Erro ao acessar a página "${page}":`, error.message);
      return {
        father: '',
        conteudo: [],
        links: [],
        textoCompleto: ''
      };
    }
  }

  // Método de crawling recursivo
  async crawlRecursive(page) {
    if (this.visited.has(page)) return;

    this.visited.add(page);
    const result = await this.fetchPageContent(page);

    const resultKey = JSON.stringify(result);
    const alreadyExists = this.resultados.some(r => JSON.stringify(r) === resultKey);

    if (!alreadyExists) {
      this.resultados.push(result);

      for (const link of result.links) {
        await this.crawlRecursive(link);
      }
    }
  }

  // Método para contar ocorrências de um termo
  contarOcorrencias(texto, termo) {
    // Normaliza o texto e o termo, removendo pontuações extras
    const textoNormalizado = texto.toLowerCase()
      .replace(/[.,;:!?]/g, ' ')  // Substitui pontuações por espaços
      .replace(/\s+/g, ' ')       // Remove espaços extras
      .trim();

    const termoNormalizado = termo.toLowerCase()
      .replace(/[.,;:!?]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Usa regex para encontrar ocorrências exatas
    const regex = new RegExp(`\\b${termoNormalizado}\\b`, 'g');
    const ocorrencias = (textoNormalizado.match(regex) || []).length;

    return ocorrencias;
  }

  // Método para buscar ocorrências de um termo
  buscarOcorrencias(termo) {
    return this.resultados.map(item => ({
      ocorrencias: this.contarOcorrencias(item.textoCompleto, termo),
      qtd_links: item.links.length,
      site: `${item.father}.html`,
      links: item.links,
      links_repetidos: this.contarRepeticoes(`${item.father}.html`, item.links)
    }));
  }

  // Método para contar repetições de links
  contarRepeticoes(linkAlvo, listaLinks) {
    return listaLinks.filter(link => link === linkAlvo).length;
  }

  // Método principal para executar o crawler
  async executarCrawler(paginasIniciais = [
    'duna.html',
    // 'blade_runner.html',
    // 'interestelar.html',
    // 'mochileiro.html',
    // 'matrix.html'
  ]) {
    for (const pagina of paginasIniciais) {
      await this.crawlRecursive(pagina);
    }

    return {
      resultados: this.resultados,
      todosOsLinks: this.todosOsLinks,
      buscarOcorrencias: this.buscarOcorrencias.bind(this)
    };
  }
}

// 🚀 Exportação
module.exports = {
  WebCrawler,
  executarCrawler: () => {
    const crawler = new WebCrawler();
    return crawler.executarCrawler();
  }
};
