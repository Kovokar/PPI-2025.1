const express = require('express');
const { client, connectDB } = require('./db'); // ou './db/db' se você colocou em uma subpasta

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.get('/', (req, res) => {
    res.send('Servidor Express funcionando e conectado ao PostgreSQL!');
});

app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
});
