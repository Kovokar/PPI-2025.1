// Importando o pacote pg para conectar ao PostgreSQL
const { Client } = require('pg');
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// Configuração da conexão com o banco PostgreSQL
let client = new Client({
    host: 'localhost',
    port: 5432,
    user: dbUser,
    password: dbPassword,
    database: dbName,
});

const connectDB = async () => {
    try {
        await client.connect();
        console.log('Conexão com o PostgreSQL realizada com sucesso!');
    } catch (err) {
        console.error('Erro na conexão com o PostgreSQL', err);
    }
};

module.exports = { client , connectDB };
