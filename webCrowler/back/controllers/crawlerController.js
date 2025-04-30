const { executarCrawler } = require('../services/webCrawler');

let cacheCrawler = null;

const iniciarCrawling = async (req, res) => {
  try {
    cacheCrawler = await executarCrawler();
    
    // Preparando o texto completo de todas as páginas para retornar
    const textoCompletoPaginas = {};
    
    cacheCrawler.resultados.forEach(pagina => {
      // Adiciona o texto completo de cada página ao objeto de resposta
      textoCompletoPaginas[pagina.father] = pagina.textoCompleto;
    });
    
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

const buscarTermo = (req, res) => {
  const termo = req.query.termo;

  if (!cacheCrawler) {
    return res.status(400).json({ erro: 'Crawler ainda não foi executado.' });
  }

  if (!termo) {
    return res.status(400).json({ erro: 'Parâmetro "termo" é obrigatório.' });
  }

  const resultado = cacheCrawler.buscarOcorrencias(termo);
  res.json({ 
    termo,
    totalOcorrencias: resultado.totalOcorrencias,
    ocorrenciasPorPagina: resultado.detalhamento
  });
};

module.exports = {
  iniciarCrawling,
  buscarTermo
};