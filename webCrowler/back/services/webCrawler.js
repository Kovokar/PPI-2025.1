// 📦 IMPORTAÇÕES E CONSTANTES
const axios = require('axios');
const cheerio = require('cheerio');
const { link } = require('fs');
const path = require('path');

const BASE_URL = 'http://127.0.0.1:5500/paginas/';

const globals = {
  visited: new Set(),
  resultados: [],
  todosOsLinks: []
};

async function fetchPageContent(page) {
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

        globals.todosOsLinks.push(href);
        
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

function contarOcorrencias(texto, termo) {
  const palavras = texto.toLowerCase().split(/\W+/);
  const alvo = termo.toLowerCase();
  return palavras.filter(p => p === alvo).length;
}

function buscarOcorrencias(termo) {
  const ocorrencias = [];

  for (const i of globals.resultados) {
    const repeticoes = contarOcorrencias(i.textoCompleto, termo);
    const links_repetidos = contarRepeticoes(`${i.father}.html`, i.links)
    console.log(termo)
    console.log('\n\n\n')
    console.log(i.textoCompleto)
    ocorrencias.push({
      ocorrencias: repeticoes,
      qtd_links: i.links.length,
      site: `${i.father}.html`,
      links: i.links,
      links_repetidos: links_repetidos
    });
  }

  return ocorrencias;
}

function contarRepeticoes(linkAlvo, listaLinks) {
  let contador = 0;

  listaLinks.forEach(link => {
    if (link === linkAlvo) {
      contador++;
    }
  });

  return contador;
}




async function executarCrawler() {
  const paginasIniciais = [
    'duna.html',
    'blade_runner.html',
    'interestelar.html',
    'mochileiro.html',
    'matrix.html'
  ];

  for (const pagina of paginasIniciais) {
    await crawlRecursive(pagina);
  }

  return {
    resultados: globals.resultados,
    todosOsLinks: globals.todosOsLinks,
    buscarOcorrencias
  };
}

module.exports = { executarCrawler };
