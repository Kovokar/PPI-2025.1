const { executarCrawler } = require('../services/webCrawler');

const iniciarCrawling = async (req, res) => {
  try {
    const { conteudo, links } = await executarCrawler();
    console.log(conteudo, links); // Aqui está sua linha!
    res.json({ sucesso: true ,conteudo: conteudo, links: links });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao executar o crawler' });
  }
};

module.exports = { iniciarCrawling };
