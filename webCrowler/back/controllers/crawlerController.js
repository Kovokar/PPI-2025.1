const { executarCrawler } = require('../services/webCrawler');



const iniciarCrawling = async (req, res) => {
  try {
    const result = await executarCrawler();

    res.json(result);
  } catch (err) {
    console.error('Erro no controiller:', err.message);
    res.status(500).json({ erro: 'Erro ao executar o crawler' });
  }
};

module.exports = { iniciarCrawling };
