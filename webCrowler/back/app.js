require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rotas
const crawlerRoutes = require('./routes/crawlerRoutes');
app.use('/crawler', crawlerRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
