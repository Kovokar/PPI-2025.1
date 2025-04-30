const { executarCrawler } = require('../services/webCrawler');

const iniciarCrawling = async (req, res) => {
  try {
    // const {father, conteudo, links } = await executarCrawler();
    const resp = await executarCrawler()

    // res.json({
    //   father,
    //   conteudo,
    //   links
    // });
    res.json(resp)
  } catch (err) {
    console.error('Erro no controiller:', err.message);
    res.status(500).json({ erro: 'Erro ao executar o crawler' });
  }
};

module.exports = { iniciarCrawling };
