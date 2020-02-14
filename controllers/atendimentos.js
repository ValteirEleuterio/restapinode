const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, resp) => {
        Atendimento.lista()
                   .then(resultados => resp.status(200).json(resultados))
                   .catch(erro => resp.status(400).json(erro));
    });

    app.get('/atendimentos/:id', (req, resp) => {
        const id = parseInt(req.params.id);
        Atendimento.buscaPorId(id)
                   .then(atendimento => resp.status(200).json(atendimento))
                   .catch(erro => resp.status(400).json(erro));
                   
    });

    app.post('/atendimentos', (req, resp) => {
        const atendimento = req.body;
        Atendimento.adiciona(atendimento)
                   .then(atendimento => resp.status(201).json(atendimento))
                   .catch(erros => resp.status(400).json(erros));
    });

    app.patch('/atendimentos/:id', (req, resp) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.altera(id, valores)
                   .then(resultados => resp.status(200).json(resultados))
                   .catch(erro => resp.status(400).json(erro));
    });

    app.delete('/atendimentos/:id', (req, resp) => {
        const id = parseInt(req.params.id);
        Atendimento.deleta(id)
                   .then(resultados => resp.status(200).json(resultados))
                   .catch(erro => resp.status(400).json(erro));
    });
}
