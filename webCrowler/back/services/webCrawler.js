const axios = require('axios')
const cheerio = require('cheerio')

async function crawlPage(page) {
  const url = `http://127.0.0.1:5500/páginas/${page}`
  try {
    const response = await axios.get(encodeURI(url))
    const $ = cheerio.load(response.data)

    const father = page.replace(".html", "")
    const conteudo = []
    const links = []

    $('a').each((_, element) => {
      const href = $(element).attr('href')
      const txt = $(element).text().trim()

      if (href && !href.startsWith('#')) {
        conteudo.push(txt);
        links.push(href);
      }
    });

    return { father, conteudo, links }
  } catch (err) {
    console.error("Erro ao acessar a página:", err.message)
    return {father: '', conteudo: [], links: [] }
  }
}

const globals = {
  links_found: [],
  objetos: [],
  visited: new Set() // <-- novo

}

async function teste2(page) {
  const result = await crawlPage(page);
  const resultStr = JSON.stringify(result);
  const exists = globals.objetos.some(obj => JSON.stringify(obj) === resultStr);

  if (!exists) {
    globals.objetos.push(result);
    if (result.links) {
      
      for (const link of result.links) {
        if (!globals.visited.has(link)) {
          globals.visited.add(link);
          await teste2(link);
        }
      }
    }
  }

  return globals;
}


const executarCrawler = async () => {
  const duna = 'duna.html';
  const blade = 'blade_runner.html';
  const interestelar = 'interestelar.html'
  const mochilheiro = 'mochileiro.html'
  const matrix = 'matrix'

  const result = await teste2(duna);

  return result;
};


 

module.exports = { executarCrawler }
