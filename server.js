// Importação:
const app = require('./app');

// Importação da Configuração (variables.env):
require('dotenv').config({path: 'variables.env'});

// Configuração do Servidor:
app.set('port', process.env.PORT || 7777);   
const server = app.listen(app.get('port'),() => {
    console.log("[OK] - Servidor em PORT: " + server.address().port);
}); 