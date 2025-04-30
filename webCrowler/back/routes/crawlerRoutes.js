const express = require('express');
const router = express.Router();
const { iniciarCrawling } = require('../controllers/crawlerController');

router.get('/iniciar', iniciarCrawling);

module.exports = router;
