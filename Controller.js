const express = require('express');
const cors = require('cors');
// const { json } = require('sequelize/types');
const { Sequelize } = require('./models');


const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let pedido = models.Pedido;
let servico = models.Servico;
let itempedido = models.ItemPedido;

app.get('/', function (req, res) {
    res.send('Olá mundo!');
});

app.post('/cliente', async (req, res) => {
    await cliente.create(
        req.body
    ).then(cli => {
        return res.json({
            error: false,
            message: "Cliente inserido com sucesso.",
            cli
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o cliente."
        });
    });
});

app.post('/cliente/:id/pedido', async (req, res) => {
    const ped = {
        data: req.body.data,
        ClienteId: req.params.id
    };

    if (!await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe.'
        });
    };

    await pedido.create(ped)
        .then(order => {
            return res.json({
                error: false,
                message: "Pedido inserido com sucesso.",
                order
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível inserir o pedido."
            });
        });
});

app.post('/servico', async (req, res) => {
    await servico.create(
        req.body
    ).then(serv => {
        return res.json({
            error: false,
            message: "Serviço inserido com sucesso.",
            serv
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o serviço."
        });
    });
});

app.post('/pedido/:id1/servico/:id2/itempedido', async (req, res) => {
    const itemp = {
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        PedidoId: req.params.id1,
        ServicoId: req.params.id2
    }

    if (!await pedido.findByPk(req.params.id1)) {
        return res.status(400).json({
            error: true,
            messsage: 'Pedido não existe.'
        });
    };

    if (!await servico.findByPk(req.params.id2)) {
        return res.status(400), json({
            error: true,
            message: "Serviço não existe."
        });
    };

    await itempedido.create(itemp)
        .then(order => {
            return res.json({
                error: false,
                message: "Item-pedido adicionado e vinculado aos seus respectivos pedidos e serviços com sucesso.",
                order
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível inserir o item-pedido."
            });
        });
});

app.get('/cliente/:id', async(req, res)=>{

    if(!await cliente.findByPk(req.params.id, {include: [{all:true}]})){
        return res.json({
            error:true,
            message: "Este cliente não existe."
        })
    }

    await cliente.findByPk(req.params.id, {include: [{all:true}]})
    .then(cli=>{
        return res.json({cli});
    }).catch(erro=>{
        return res.status(400).json({
            error:true,
            message: "Não pois possível consultar este cliente"
        });
    });
})

app.get('/pedido/:id', async(req, res)=>{

    if(!await pedido.findByPk(req.params.id, {include: [{all:true}]})){
        return res.json({
            error:true,
            message: "Este pedido não existe."
        })
    }

    await pedido.findByPk(req.params.id, {include: [{all:true}]})
    .then(ped=>{
        return res.json({ped});
    }).catch(erro=>{
        return res.status(400).json({
            error:true,
            message: "Não pois possível consultar este pedido"
        });
    });
})

app.get('/servico/:id', async(req, res)=>{

    if(!await servico.findByPk(req.params.id, {include: [{all:true}]})){
        return res.json({
            error:true,
            message: "Este serviço não existe."
        })
    }

    await servico.findByPk(req.params.id, {include: [{all:true}]})
    .then(serv=>{
        return res.json({serv});
    }).catch(erro=>{
        return res.status(400).json({
            error:true,
            message: "Não pois possível consultar este serviço"
        });
    });
});

app.get('/itempedido/:id1/:id2', async(req, res)=>{ 

    if(!await pedido.findByPk(req.params.id1, {include: [{all:true}]})){
        return res.json({
            error:true,
            message: "Este item-pedido não existe."
        })
    }

    if(!await servico.findByPk(req.params.id2, {include: [{all:true}]})){
        return res.json({
            error:true,
            message: "Este serviço não existe."
        })
    }

    await itempedido.findOne({where: {PedidoId: req.params.id1, ServicoId: req.params.id2}})
    .then(itemp=>{
        return res.json({itemp});
    }).catch(erro=>{
        return res.status(400).json({
            error:true,
            message: "Não pois possível consultar este item-pedido"
        });
    });
});

app.get('/clientes', async (req, res) => {
    await cliente.findAll({ include: [{ all: true }] })
        .then(cli => {
            return res.json({
                error: false,
                cli
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível listar os clientes."
            });
        });
});

app.get('/pedidos', async (req, res) => {
    await pedido.findAll({ include: [{ all: true }] })
        .then(ped => {
            return res.json({
                error: false,
                ped
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível listar os pedidos."
            });
        });
});

app.get('/servicos', async (req, res) => {
    await servico.findAll({ include: [{ all: true }] })
        .then(serv => {
            return res.json({
                error: false,
                serv
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível listar os serviços."
            });
        });
});

app.get('/itenspedidos', async (req, res) => {
    await itempedido.findAll({ include: [{ all: true }] })
        .then(itemp => {
            return res.json({
                error: false,
                itemp
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível listar os itens-pedidos."
            })
        })
})

app.put('/attcliente', async (req, res) => {
    const cli = {
        nome: req.body.nome,
        nascimento: req.body.nascimento
    };

    await cliente.update(cli, {
        where: Sequelize.and({ id: req.body.id })
    }).then(clientes => {
        return res.json({
            error: false,
            message: "Cliente alterado com sucesso.",
            clientes
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar cliente."
        })
    })
})

app.put('/cliente/:id/attpedido', async (req, res) => {
    const ped = {
        data: req.body.data,
        ClienteId: req.params.id
    };

    if (!await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe.'
        });
    };

    await pedido.update(ped, {
        where: Sequelize.and({ ClienteId: req.params.id },
            { id: req.body.id })
    }).then(pedidos => {
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso.",
            pedidos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar pedido."
        })
    })
})

app.put('/attservico', async (req, res) => {
    await servico.update(req.body, {
        where: { id: req.body.id }
    }).then(servicos => {
        return res.json({
            error: false,
            message: "Serviço alterado com sucesso.",
            servicos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar serviço."
        });
    });
});

app.put('/attitempedido/:id1/:id2', async (req, res) => {
    const itemped = {
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        PedidoId: req.params.id1,
        ServicoId:req.params.id2,
    };

    if (!await pedido.findByPk(req.params.id1)) {
        return res.status(400).json({
            error: true,
            message: 'Pedido não foi encontrado.'
        });
    };

    if (!await servico.findByPk(req.params.id2)) {
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        });
    };

    await itempedido.update(itemped, {
        where: Sequelize.and({ PedidoId: req.params.id1 }, { ServicoId: req.params.id2})
    }).then(itemp => {
        return res.json({
            error: false,
            message: "Item-pedido alterado com sucesso.",
            itemp
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar item-pedido."
        })
    })
})

app.get('/excluircliente/:id', async (req, res) => {

    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message: "Este cliente não existe."
        })
    }
    await cliente.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Cliente excluído com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir cliente."
        })
    })
})

app.get('/excluirpedido/:id', async (req, res) => {

    if (!await pedido.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Este pedido não existe.'
        });
    };

    await pedido.destroy({
        where: Sequelize.and({ id: req.params.id })
    }).then(function () {
        return res.json({
            error: false,
            message: "Pedido excluído com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir pedido."
        })
    })
})  

app.get('/excluirservico/:id', async (req, res) => {

    if (!await servico.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Este serviço não existe.'
        });
    };

    await servico.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Cliente excluído com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir cliente."
        })
    })
})

app.get('/excluiritempedido/:id1/:id2', async (req, res) => {

    if (!await pedido.findByPk(req.params.id1)) {
        return res.status(400).json({
            error: true,
            message: 'Este pedido não existe.'
        });
    };

    if (!await servico.findByPk(req.params.id2)) {
        return res.status(400).json({
            error: true,
            message: 'Este serviço não existe.'
        });
    };

    await itempedido.destroy({
        where: Sequelize.and({ PedidoId: req.params.id1 }, { ServicoId: req.params.id2})
    }).then(function () {
        return res.json({
            error: false,
            message: "Item-pedido excluído com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir item-pedido."
        })
    })
}) 

let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log('Servidor ativo: http://localhost:3001')
})