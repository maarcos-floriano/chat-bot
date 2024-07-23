require('dotenv').config({path:'.env'});
const express = require('express');
const app = express();
const porta = process.env.APP_PORT || 3000;

var cors = require('cors');
var path = require('path');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const userRoute = require('./src/routes/userRoute');
app.use('/user', userRoute);

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});