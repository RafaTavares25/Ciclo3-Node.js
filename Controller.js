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
    res.send('Olá, mundo!')
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
            message: "Foi impossível se conectar."
        })
    });
});

app.get('/clientes', async(req, res)=>{
    await cliente.create({
        nome: "Rafael Tavares   ",
        endereco: "Rua...",
        cidade: "Maringá",
        uf: "...",
        nascimento: new Date(2004, 07, 25),
        clienteDesde: new Date(),
        createAt: new Date(),
        updateAt: new Date()
    })
    res.send('Cliente cadastrado com sucesso!');
});

app.get('/pedidos', async(req, res)=>{
    await pedido.create({
        data: new Date(),
        ClienteId: 1,
        createAt: new Date(),
        updateAt: new Date()
    })
    res.send('Pedido feito com sucesso!')
})

app.get('/itempedidos', async(req, res)=>{
    await itempedido.create({
        PedidoId: 1,
        ServicoId: 1,
        quantidade: 1,
        valor: 5.00,
        createAt: new Date(),
        updateAt: new Date()
    })
    res.send('O item foi adicionado')
})

let port = process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})