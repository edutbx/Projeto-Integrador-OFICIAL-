// Importando Libs:
const express = require('express');
const router = require('../index');

// Configuração geral do projeto:
const app = express();
app.use('/', router);

// Exportação:
module.exports = app;