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
let compra = models.Compra;
let produto = models.Produto;
let itemcompra = models.ItemCompra;

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

app.post('/cliente/:id/compra', async (req, res) => {
    const comp = {
        data: req.body.data,
        ClienteId: req.params.id
    };

    if (!await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe.'
        });
    };

    await compra.create(comp)
        .then(order => {
            return res.json({
                error: false,
                message: "Compra inserido com sucesso.",
                order
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível inserir a compra."
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

app.post('/produto', async (req, res) => {
    await produto.create(
        req.body
    ).then(prod => {
        return res.json({
            error: false,
            message: "Produto inserido com sucesso.",
            prod
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o produto."
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

app.post('/compra/:id1/produto/:id2/itemcompra', async (req, res) => {
    const itemc = {
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        CompraId: req.params.id1,
        ProdutoId: req.params.id2
    }

    if (!await compra.findByPk(req.params.id1)) {
        return res.status(400).json({
            error: true,
            messsage: 'Compra não existe.'
        });
    };

    if (!await produto.findByPk(req.params.id2)) {
        return res.status(400), json({
            error: true,
            message: "Produto não existe."
        });
    };

    await itemcompra.create(itemc)
        .then(order => {
            return res.json({
                error: false,
                message: "Item-comprado foi adicionado e vinculado às suas respectivas compras e produtos com sucesso.",
                order
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível inserir o item-comprado."
            });
        });
});

app.get('/cliente/:id', async (req, res) => {

    if (!await cliente.findByPk(req.params.id, { include: [{ all: true }] })) {
        return res.json({
            error: true,
            message: "Este cliente não existe."
        })
    }

    await cliente.findByPk(req.params.id, { include: [{ all: true }] })
        .then(cli => {
            return res.json({ cli });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não pois possível consultar este cliente"
            });
        });
})

app.get('/pedido/:id', async (req, res) => {

    if (!await pedido.findByPk(req.params.id, { include: [{ all: true }] })) {
        return res.json({
            error: true,
            message: "Este pedido não existe."
        })
    }

    await pedido.findByPk(req.params.id, { include: [{ all: true }] })
        .then(ped => {
            return res.json({ ped });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não pois possível consultar este pedido"
            });
        });
})

app.get('/compra/:id', async (req, res) => {

    if (!await compra.findByPk(req.params.id, { include: [{ all: true }] })) {
        return res.json({
            error: true,
            message: "Esta compra não existe."
        })
    }

    await compra.findByPk(req.params.id, { include: [{ all: true }] })
        .then(comp => {
            return res.json({ comp });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não pois possível consultar esta compra"
            });
        });
})

app.get('/servico/:id', async (req, res) => {

    if (!await servico.findByPk(req.params.id, { include: [{ all: true }] })) {
        return res.json({
            error: true,
            message: "Este serviço não existe."
        })
    }

    await servico.findByPk(req.params.id, { include: [{ all: true }] })
        .then(serv => {
            return res.json({ serv });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não pois possível consultar este serviço"
            });
        });
});

app.get('/produto/:id', async (req, res) => {

    if (!await produto.findByPk(req.params.id, { include: [{ all: true }] })) {
        return res.json({
            error: true,
            message: "Este produto não existe."
        })
    }

    await produto.findByPk(req.params.id, { include: [{ all: true }] })
        .then(prod => {
            return res.json({ prod });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não pois possível consultar este produto"
            });
        });
});

app.get('/itempedido/:id1/:id2', async (req, res) => {

    if (!await pedido.findByPk(req.params.id1, { include: [{ all: true }] })) {
        return res.json({
            error: true,
            message: "Este item-pedido não existe."
        })
    }

    if (!await servico.findByPk(req.params.id2, { include: [{ all: true }] })) {
        return res.json({
            error: true,
            message: "Este serviço não existe."
        })
    }

    await itempedido.findOne({ where: { PedidoId: req.params.id1, ServicoId: req.params.id2 } })
        .then(itemp => {
            return res.json({ itemp });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não pois possível consultar este item-pedido"
            });
        });
});

app.get('/itemcompra/:id1/:id2', async (req, res) => {

    if (!await compra.findByPk(req.params.id1, { include: [{ all: true }] })) {
        return res.json({
            error: true,
            message: "Esta compra não existe."
        })
    }

    if (!await produto.findByPk(req.params.id2, { include: [{ all: true }] })) {
        return res.json({
            error: true,
            message: "Este produto não existe."
        })
    }

    await itemcompra.findOne({ where: { CompraId: req.params.id1, ProdutoId: req.params.id2 } })
        .then(itemc => {
            return res.json({ itemc });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não pois possível consultar este item-comprado"
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

app.get('/compras', async (req, res) => {
    await compra.findAll({ include: [{ all: true }] })
        .then(comp => {
            return res.json({
                error: false,
                comp
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível listar as compras."
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

app.get('/produtos', async (req, res) => {
    await produto.findAll({ include: [{ all: true }] })
        .then(prod => {
            return res.json({
                error: false,
                prod
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível listar os produtos."
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

app.get('/itenscomprados', async (req, res) => {
    await itemcompra.findAll({ include: [{ all: true }] })
        .then(itemc => {
            return res.json({
                error: false,
                itemc
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível listar os itens-comprados."
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
        });
    });
});

app.put('/cliente/:id/attcompra', async (req, res) => {
    const comp = {
        data: req.body.data,
        ClienteId: req.params.id
    };

    if (!await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe.'
        });
    };

    await compra.update(comp, {
        where: Sequelize.and({ ClienteId: req.params.id },
            { id: req.body.id })
    }).then(compras => {
        return res.json({
            error: false,
            message: "compra alterada com sucesso.",
            compras
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar esta compra."
        });
    });
});

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

app.put('/attproduto', async (req, res) => {
    await produto.update(req.body, {
        where: { id: req.body.id }
    }).then(produtos => {
        return res.json({
            error: false,
            message: "Produto alterado com sucesso.",
            produtos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar este produto."
        });
    });
});

app.put('/attitempedido/:id1/:id2', async (req, res) => {
    const itemped = {
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        PedidoId: req.params.id1,
        ServicoId: req.params.id2,
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
        where: Sequelize.and({ PedidoId: req.params.id1 }, { ServicoId: req.params.id2 })
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

app.put('/attitemcompra/:id1/:id2', async (req, res) => {
    const itemcomp = {
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        CompraId: req.params.id1,
        ProdutoId: req.params.id2,
    };

    if (!await compra.findByPk(req.params.id1)) {
        return res.status(400).json({
            error: true,
            message: 'Esta Compra não foi encontrada.'
        });
    };

    if (!await produto.findByPk(req.params.id2)) {
        return res.status(400).json({
            error: true,
            message: 'Este Produto não foi encontrado.'
        });
    };

    await itemcompra.update(itemcomp, {
        where: Sequelize.and({ CompraId: req.params.id1 }, { ProdutoId: req.params.id2 })
    }).then(itemc => {
        return res.json({
            error: false,
            message: "Item-comprado foi alterado com sucesso.",
            itemc
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar item-comprado."
        })
    })
})

app.get('/excluircliente/:id', async (req, res) => {

    if (!await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
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

app.get('/excluircompra/:id', async (req, res) => {

    if (!await compra.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Este pedido não existe.'
        });
    };

    await compra.destroy({
        where: Sequelize.and({ id: req.params.id })
    }).then(function () {
        return res.json({
            error: false,
            message: "compra excluída com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir compra."
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
            message: "Serviço excluído com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir este serviço."
        })
    })
})

app.get('/excluirproduto/:id', async (req, res) => {

    if (!await produto.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Este produto não existe.'
        });
    };

    await produto.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Produto excluído com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir este produto."
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
        where: Sequelize.and({ PedidoId: req.params.id1 }, { ServicoId: req.params.id2 })
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

app.get('/excluiritemcomprado/:id1/:id2', async (req, res) => {

    if (!await pedido.findByPk(req.params.id1)) {
        return res.status(400).json({
            error: true,
            message: 'Esta compra não existe.'
        });
    };

    if (!await produto.findByPk(req.params.id2)) {
        return res.status(400).json({
            error: true,
            message: 'Este produto não existe.'
        });
    };

    await itemcompra.destroy({
        where: Sequelize.and({ CompraId: req.params.id1 }, { ProdutoId: req.params.id2 })
    }).then(function () {
        return res.json({
            error: false,
            message: "Item-comprado excluído com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível excluir item-comprado."
        })
    })
})

let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log('Servidor ativo: http://localhost:3001')
})