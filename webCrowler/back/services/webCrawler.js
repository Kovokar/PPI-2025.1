// 📦 Importações
const axios = require("axios");
const cheerio = require("cheerio");
const { url } = require("inspector");
const path = require("path");

// 🌐 Configurações
var BASE_URL = "http://127.0.0.1:5500/webCrowler/paginas/";
var customUrl = "";
// 🔍 Classe WebCrawler para encapsular a lógica de crawling
class WebCrawler {
  constructor() {
    this.visited = new Set();
    this.resultados = [];
    this.todosOsLinks = [];
  }

  // Método para buscar conteúdo de uma página
  async fetchPageContent(page) {
    const url = BASE_URL ? encodeURI(`${BASE_URL}${page}`) : customUrl;
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const pageId = BASE_URL ? path.basename(page, ".html") : customUrl;
      const links = [];
      // const textoCompleto = $('head').text().trim();

      const textoCompleto = $.html(); // Extrai todo o conteúdo da página

      $("a").each((_, el) => {
        const href = $(el).attr("href");

        if (href && !href.startsWith("#")) {
          links.push(href);
          this.todosOsLinks.push(href);
        }
      });

      return {
        father: pageId,
        links,
        textoCompleto,
      };
    } catch (error) {
      console.error(
        `Erro aso acessar a página "${BASE_URL ? page : customUrl}":`,
        error.message
      );
      return {
        father: "",
        conteudo: [],
        links: [],
        textoCompleto: "",
      };
    }
  }

  // Método de crawling recursivo
  async crawlRecursive(link) {
    if (this.visited.has(link)) return;

    this.visited.add(link);
    const result = await this.fetchPageContent(link);

    const resultKey = JSON.stringify(result);
    const alreadyExists = this.resultados.some(
      (r) => JSON.stringify(r) === resultKey
    );

    if (!alreadyExists) {
      this.resultados.push(result);

      for (const link of result.links) {
        customUrl = customUrl.replace(/\/[^\/]*$/, `/${link}`);
        await this.crawlRecursive(link);
      }
    }
  }

  // Método para contar ocorrências de um termo
  contarOcorrencias(texto, termo) {
    // Normaliza o texto e o termo, removendo pontuações extras
    const textoNormalizado = texto
      .toLowerCase()
      .replace(/[.,;:!?]/g, " ") // Substitui pontuações por espaços
      .replace(/\s+/g, " ") // Remove espaços extras
      .trim();

    const termoNormalizado = termo
      .toLowerCase()
      .replace(/[.,;:!?]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Usa regex para encontrar ocorrências exatas
    const regex = new RegExp(`\\b${termoNormalizado}\\b`, "g");
    const ocorrencias = (textoNormalizado.match(regex) || []).length;

    return ocorrencias;
  }

  buscarOcorrencias(termo) {
    const resultadosComOcorrencias = this.resultados
      .map((item) => {
        const ocorrencias = this.contarOcorrencias(item.textoCompleto, termo);
        if (ocorrencias) {
          let qtd_links_repetidos = this.contarRepeticoes(
            `${item.father}.html`,
            item.links
          );
          let qtd_referencias =
            this.contarReferenciasDeLinks(
              this.todosOsLinks,
              `${item.father}.html`
            ) - qtd_links_repetidos;
          return {
            ocorrencias: ocorrencias * 5,
            site: `${item.father}.html`,
            qtd_referencias: qtd_referencias * 10,
            links: item.links,
            links_repetidos: qtd_links_repetidos * -15,
            total:
              ocorrencias * 5 + qtd_referencias * 10 - qtd_links_repetidos * 15,
          };
        }
        return null;
      })
      .filter((item) => item !== null)
      .sort((a, b) => {
        if (b.total !== a.total) return b.total - a.total;
        if (b.qtd_referencias !== a.qtd_referencias)
          return b.qtd_referencias - a.qtd_referencias;
        if (b.ocorrencias !== a.ocorrencias)
          return b.ocorrencias - a.ocorrencias;
        return a.links_repetidos - b.links_repetidos;
      });
    return resultadosComOcorrencias;
  }

  contarRepeticoes(linkAlvo, listaLinks) {
    return listaLinks.filter((link) => link === linkAlvo).length;
  }

  contarReferenciasDeLinks(array, palavra) {
    return array.reduce((contador, item) => {
      return contador + (item === palavra ? 1 : 0);
    }, 0);
  }

  // Método principal para executar o crawler
  async executarCrawler(url = "") {
    BASE_URL = url ? "" : "http://127.0.0.1:5500/paginas/";
    customUrl = url ? url : "";

    await this.crawlRecursive(url ? url : "matrix.html");

    let resp = {
      resultados: this.resultados,
      todosOsLinks: this.todosOsLinks,
      buscarOcorrencias: this.buscarOcorrencias.bind(this),
    };

    return resp;
  }
}

// 🚀 Exportação
module.exports = {
  WebCrawler,

  executarCrawler: (url) => {
    const crawler = new WebCrawler();
    return crawler.executarCrawler(url);
  },
};
