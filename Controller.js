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



app.get('/ofertaservicos', async(req, res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

app.get('/servico/:id', async(req, res)=>{
    await servico.findByPk(req.params.id)
    .then((serv) =>{
        return res.json({
            error: false,
            serv
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível conectar-se!"
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

app.get('/listaclientes', async(req, res)=>{
    await cliente.findAll({
        raw: true
    }).then(function(clientes){
        res.json({clientes})
    });
});

app.get('/listaclientesasc', async(req, res)=>{
    await cliente.findAll({
        order: [['nascimento', 'ASC']]
    }).then(function(clientes){
        res.json({clientes})
    });
});

app.put('/atualizaservico', async(req, res)=>{
    await servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço foi altrerado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            erro: true,
            message: "Erro na alteração do serviço"
        })
    })
});

app.get('/pedidos/:id', async(req, res)=>{
    await pedido.findByPk(req.params.id,{include:[{all:true}]})
    .then(ped=>{
        return res.json({ped})
    })
})
let port = process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
});