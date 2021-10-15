const express = require('express');
const cors = require('cors');

const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;

app.get('/', function(req, res){
    res.send('Olá, mundo!');
});

app.post('/servicos', async(req,res)=>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            erro: false,
            message: "Serviço criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            erro: true,
            message: "Não foi possível conectar-se."
        });
    });
});

app.post('/clientes', async(req, res)=>{
    await cliente.create(
        req.body
    ).then(function(){
        return res.json({
            erro: false,
            message: "Cliente cadastrado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            erro: true,
            message: "Não foi possível conectar-se."
        });
    });
});

app.post('/pedidos', async(req, res)=>{
    await pedido.create(
        req.body
    ).then(function(){
        return res.json({
            erro: false,
            message: "Pedido feito com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            erro: true,
            message: "Não foi possível conectar-se."
        });
    });
});

app.post('/itempedidos', async(req, res)=>{
    await itempedido.create(
        req.body
    ).then(function(){
        return res.json({
            erro: false,
            message: "O item foi adicionado com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            erro: true,
            message: "Não foi possível conectar-se."
        });
    });
});

app.get('/listaservicos', async(req, res)=>{
    await servico.findAll({
        raw: true
    }).then(function(servicos){
        res.json({servicos})
    });
});

let port = process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})