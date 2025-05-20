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
      const links = [];
      // const textoCompleto = $('head').text().trim();

      const textoCompleto = $.html(); // Extrai todo o conteúdo da página


      $('a').each((_, el) => {
        const href = $(el).attr('href');

        if (href && !href.startsWith('#')) {
          links.push(href);
          this.todosOsLinks.push(href);
        }
      });

      return {
        father: pageId,
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
  async crawlRecursive(link) {
    if (this.visited.has(link)) return;

    this.visited.add(link);
    const result = await this.fetchPageContent(link);
    
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
    // console.log(this.todosOsLinks)
    return this.resultados.map(item => {
      const ocorrencias = this.contarOcorrencias(item.textoCompleto, termo);
        if (ocorrencias) { 
          let qtd_links_repetidos = this.contarRepeticoes(`${item.father}.html`, item.links)
          return {
            ocorrencias,
            site: `${item.father}.html`,
            qtd_referencias: this.contarReferenciasDeLinks(this.todosOsLinks, `${item.father}.html`) - qtd_links_repetidos,
            links: item.links,
            links_repetidos: qtd_links_repetidos
          };
        } 
      return {}
    });
  }
  

  // Método para contar repetições de links
  contarRepeticoes(linkAlvo, listaLinks) {
    return listaLinks.filter(link => link === linkAlvo).length;
  }

  contarReferenciasDeLinks(array, palavra) {
    return array.reduce((contador, item) => {
      return contador + (item === palavra ? 1 : 0);
    }, 0);
  }

  // Método principal para executar o crawler
  async executarCrawler(paginasIniciais = ['matrix.html']) {
    for (const pagina of paginasIniciais) {
      await this.crawlRecursive(pagina);
    }

    let resp = {
      resultados: this.resultados,
      todosOsLinks: this.todosOsLinks,
      buscarOcorrencias: this.buscarOcorrencias.bind(this)
    };


    return resp
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
