const express = require('express');
const cors = require('cors');

let app = express();
app.use(cors());

app.get('/', function(req, res){
    res.send('Seja bem vindo(a) a porta central!')
});

app.get('/clientes', function(req, res){
    res.send('Seja bem vindo(a) à aba do cliente!')
});

app.get('/servicos', function(req, res){
    res.send('Area dos "serviços"')
});

app.get('/pedidos', function(req, res){
    res.send('Faça seus pedidos aqui!')
});

let port = process.env.PORT || 3000;

app.listen(port,(req, res)=>{
    console.log('Servidor ativo : http://localhost:3000')
})
