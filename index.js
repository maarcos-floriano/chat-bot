const express = require('express');
const app = express();
const porta = 3000;
var cors = require('cors');
var path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});