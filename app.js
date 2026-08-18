const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));


// Página Home 

app.get('/', (req, res) => {
    res.render('home');
});

// Página Login

app.get('/login', (req, res) => {
    const usuario = req.body.usuario;
    res.render('login', { usuario: usuario });
});

app.post('/login', (req, res) => {
    const usuario = req.body.usuario;
    res.render('home', { usuario: usuario });
});

// Rota após login (recebe o POST e redireciona para a home)
app.post('/home', (req, res) => {
    res.redirect('/');
});

// Página Sobre

app.get('/sobre', (req, res) => {
    res.render('sobre');
});

// Página Cadastro

app.get('/cadastro', (req, res) => {
    const usuario = req.body.usuario;
    res.render('cadastro', { usuario: usuario });
});

app.post('/cadastro', (req, res) => {
    const usuario = req.body.usuario;
    res.render('cadastro', { usuario: usuario });
});

app.listen(8081, () => {
    console.log('Servidor executando em http://localhost:8081');
});
