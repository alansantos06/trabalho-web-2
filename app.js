require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');

const sequelize = require('./config/database');

const app = express();

// Importa os modelos
require('./models');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(methodOverride('_method'));

// EJS
app.set('view engine', 'ejs');

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/pageRoutes'));

const PORT = process.env.PORT || 3000;

// Conecta ao banco e inicia o servidor
sequelize.authenticate()
    .then(() => {
        console.log('✅ Banco SQLite conectado!');

        return sequelize.sync();
    })
    .then(() => {
        console.log('✅ Tabelas sincronizadas!');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Erro ao conectar ao banco:', err);
    });