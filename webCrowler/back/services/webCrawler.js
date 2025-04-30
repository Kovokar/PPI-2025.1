const axios = require('axios')
const cheerio = require('cheerio')

async function crawlPage(url) {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    const conteudo = []
    const links = []

    $('a').each((_, element) => {
      // const txt = $(element).text()
      const href = $(element).attr('href')

      if (href)
        // links.push(txt)
        conteudo.push(element)
        links.push(href)
    })

    // console.log("links encontrados", links)
    return { conteudo, links }

  } catch (err) {
    console.error("Erro ao acessar a página", err.me)
  }
}


  const executarCrawler = async () => {
    const blade_url = 'http://127.0.0.1:5500/páginas/blade_runner.html';
  
    const resultado = await crawlPage(blade_url);  
    return resultado;
  };
  
  module.exports = { executarCrawler };
  