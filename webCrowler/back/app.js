require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Middleware
app.use(express.json());

// Rotas
const crawlerRoutes = require('./routes/crawlerRoutes');
app.use('', crawlerRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
