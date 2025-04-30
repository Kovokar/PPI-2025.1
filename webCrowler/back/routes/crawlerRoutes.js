const express = require('express');
const router = express.Router();
const { iniciarCrawling, buscarTermo } = require('../controllers/crawlerController');

// Rota para iniciar o crawler
router.get('/iniciar', iniciarCrawling);

// Rota para buscar termo
router.get('/iniciar/buscar', buscarTermo);

module.exports = router;
