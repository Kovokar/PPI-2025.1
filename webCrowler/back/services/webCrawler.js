const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const BASE_URL = 'http://127.0.0.1:5500/paginas/';

const globals = {
  visited: new Set(),
  resultados: [],
  todosOsLinks: [] // 🔹 Array simples
};

async function fetchPageContent(page) {
  const url = encodeURI(`${BASE_URL}${page}`);

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const pageId = path.basename(page, '.html');
    const texts = [];
    const links = [];
    
    // Captura todo o texto da página
    const textoCompleto = $('body').text().trim();

    $('a').each((_, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();

      if (href && !href.startsWith('#')) {
        texts.push(text);
        links.push(href);

        if (!globals.todosOsLinks.includes(href)) {
          globals.todosOsLinks.push(href);
        }
      }
    });

    return { 
      father: pageId, 
      conteudo: texts, 
      links,
      textoCompleto // Texto completo da página
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

async function executarCrawler() {
  const paginasIniciais = [
    'duna.html',
    'blade_runner.html',
    'interestelar.html',
    'mochileiro.html',
    'matrix.html'
  ];

  // Percorre todas as páginas iniciais
  for (const pagina of paginasIniciais) {
    await crawlRecursive(pagina);
  }

  // Mostra todos os links únicos encontrados
  console.log('Todos os links únicos encontrados:', globals.todosOsLinks);

  // Função auxiliar para contar ocorrências de um termo
  function contarOcorrencias(texto, termo) {
    let count = 0;
    let pos = texto.toLowerCase().indexOf(termo);
    
    while (pos !== -1) {
      count++;
      pos = texto.toLowerCase().indexOf(termo, pos + 1);
    }
    
    return count;
  }

  // Função para buscar e contar ocorrências
  function buscarOcorrencias(termo) {
    const termoLower = termo.toLowerCase();
    let totalOcorrencias = 0;
    const ocorrenciasPorPagina = [];

    for (const pagina of globals.resultados) {
      // Prepara textos para busca
      const conteudoUnificado = pagina.conteudo.join(' ');
      const textoCompleto = pagina.textoCompleto;
      
      // Conta ocorrências no texto dos links
      const ocorrenciasLinks = contarOcorrencias(conteudoUnificado, termoLower);
      
      // Conta ocorrências no texto completo da página
      const ocorrenciasTextoCompleto = contarOcorrencias(textoCompleto, termoLower);
      
      // Total de ocorrências nesta página
      const totalPagina = ocorrenciasLinks + ocorrenciasTextoCompleto;
      
      if (totalPagina > 0) {
        ocorrenciasPorPagina.push({
          pagina: pagina.father,
          quantidade: totalPagina
        });
        
        totalOcorrencias += totalPagina;
      }
    }

    return {
      totalOcorrencias,
      detalhamento: ocorrenciasPorPagina
    };
  }

  // Retorna os dados e a função de busca
  return {
    resultados: globals.resultados,
    todosOsLinks: globals.todosOsLinks,
    buscarOcorrencias
  };
}

module.exports = { executarCrawler };