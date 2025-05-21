require('dotenv').config();

const { executarComandoBash } = require('./services/exec');


const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const comando = 'open ../busca.html';

app.use(cors());
// Middleware
app.use(express.json());

// Rotas
const crawlerRoutes = require('./routes/crawlerRoutes');
app.use('', crawlerRoutes);

app.listen(port, () => {
  
  console.log(`Servidor rodando na porta ${port}`)

  // setTimeout(() => {
  //   executarComandoBash(comando)
  // }, 3000);

});
