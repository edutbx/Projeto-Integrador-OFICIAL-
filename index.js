const express = require('express');
const fs = require('fs');
const path = require('path');

require('dotenv').config({path: 'variables.env'});

const router = express(); 

router.use(express.static(path.join(__dirname, './assets')));

router.use('/img', express.static(path.join(__dirname, './img')));


router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if(err){
            res.status(500).send("500 - Erro Interno do Servidor");
        } else {
            res.status(200).type('text/html').send(data);
        }
    });
});

// Rota do cardápio que entrega o formulário
router.get('/login', (req, res) => {
    fs.readFile(path.join(__dirname, 'pages', 'login.html'), 'utf8', (err, data) => {
        if(err){
            res.status(500).send("500 - Erro Interno do Servidor");
        } else {
            res.send(data);
        }
    });
});

// Rota do pedido
router.get('/pedido', (req, res) => {
    const sabores = req.query.sabores || '';
    const tamanho = req.query.tamanho || 'Pequena';
    const adicionais = req.query.adicionais || 'Nenhum';
    const total = req.query.total || '0,00';

    // Montar lista HTML dos sabores
    let listaSaboresHTML = '';
    if (sabores.trim() === '') {
        listaSaboresHTML = '<li>Nenhum sabor selecionado</li>';
    } else {
        const arraySabores = sabores.split(',');
        listaSaboresHTML = arraySabores.map(sabor => `<li>${sabor}</li>`).join('');
    }

    // Montar lista HTML dos adicionais
    let listaAdicionaisHTML = '';
    if (adicionais === 'Nenhum') {
        listaAdicionaisHTML = '<li>Nenhum</li>';
    } else {
        const arrayAdicionais = adicionais.split(',');
        listaAdicionaisHTML = arrayAdicionais.map(adicional => `<li>${adicional}</li>`).join('');
    }

    fs.readFile(path.join(__dirname, 'template', 'pedido.html'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("500 - Erro Interno do Servidor");
        } else {
            data = data.replace('{sabores}', listaSaboresHTML);
            data = data.replace('{tamanho}', tamanho);
            data = data.replace('{adicionais}', listaAdicionaisHTML);
            data = data.replace('{total}', total.replace('.', ','));
            res.send(data);
        }
    });
});


module.exports = router;