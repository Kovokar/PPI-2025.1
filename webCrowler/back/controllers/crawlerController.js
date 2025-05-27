const { executarCrawler } = require('../services/webCrawler');

let cacheCrawler = null;

// 🚀 Inicia o rastreamento das páginas
const iniciarCrawling = async (req, res) => {
  try {
    cacheCrawler = await executarCrawler();

    const textoCompletoPaginas = cacheCrawler.resultados.map(pagina => pagina);

    res.json({ 
      sucesso: true, 
      mensagem: 'Crawler executado com sucesso',
      textoCompleto: textoCompletoPaginas,
      totalPaginas: cacheCrawler.resultados.length
    });

  } catch (err) {
    console.error('Erro no controller:', err.message);
    res.status(500).json({ erro: 'Erro ao executar o crawler' });
  }
};

// 🔍 Busca um termo nas páginas já rastreadas ou executa o crawler se necessário
const buscarTermo = async (req, res) => {
  const termo = req.query.termo;
  const customUrl = req.query.url || '';
  if (!termo) {
    return res.status(400).json({ erro: 'Parâmetro "termo" é obrigatório.' });
  }
  console.log('Buscando termo:', termo);
  try {
    if (!cacheCrawler || (cacheCrawler.customUrl !== customUrl)) {
      console.log('Crawler ainda não executado. Executando agora...');
      cacheCrawler = await executarCrawler(customUrl);
    }

    const resultado = cacheCrawler.buscarOcorrencias(termo);

    res.json({ 
      termo,
      resultado
    });
  } catch (err) {
    console.error('Erro ao buscar termo:', err.message);
    res.status(500).json({ erro: 'Erro ao buscar o termo.' });
  }
};

// 📤 Exporta os controladores
module.exports = {
  iniciarCrawling,
  buscarTermo
};
