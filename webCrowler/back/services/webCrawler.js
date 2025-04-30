const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const BASE_URL = 'http://127.0.0.1:5500/paginas/';

async function fetchPageContent(page) {
  const url = encodeURI(`${BASE_URL}${page}`);

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const pageId = path.basename(page, '.html');
    const texts = [];
    const links = [];

    $('a').each((_, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();

      if (href && !href.startsWith('#')) {
        texts.push(text);
        links.push(href);
      }
    });

    return { father: pageId, conteudo: texts, links };
  } catch (error) {
    console.error(`Erro ao acessar a página "${page}":`, error.message);
    return { father: '', conteudo: [], links: [] };
  }
}

const globals = {
  visited: new Set(),
  resultados: []
};

async function crawlRecursive(page) {
  if (globals.visited.has(page)) return;

  globals.visited.add(page);
  const result = await fetchPageContent(page);

  const resultKey = JSON.stringify(result);
  const alreadyExists = globals.resultados.some(r => JSON.stringify(r) === resultKey);

  if (!alreadyExists) {
    globals.resultados.push(result);

    for (const link of result.links) {
      await crawlRecursive(link);
    }
  }
}

async function executarCrawler() {
  const paginasIniciais = [
    'duna.html',
    'blade_runner.html',
    'interestelar.html',
    'mochileiro.html',
    'matrix.html'
  ];


  await crawlRecursive(paginasIniciais[4]);
  return globals.resultados;
}

module.exports = { executarCrawler };
