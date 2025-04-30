const { executarCrawler } = require('../services/webCrawler');

const iniciarCrawling = async (req, res) => {
  try {
    const resultado = await executarCrawler();
    res.json({ sucesso: true, dados: resultado });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao executar o crawler' });
  }
};

module.exports = { iniciarCrawling };
