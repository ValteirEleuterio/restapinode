const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
    
    adiciona(atendimento, resp){
        const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente dever ter pelo menos cinco caracteres'
            }
        ]

        console.log(validacoes);
        const erros = validacoes.filter(campo => !campo.valido);
        const existeErros = erros.length;

        if (existeErros) {
            resp.status(400).json(erros);
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            const sql = `INSERT INTO Atendimentos SET ?`;

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    resp.status(400).json(erro);
                } else {
                    resp.status(201).json(resultados);
                }
            })
        }       
    }
}

module.exports = new Atendimento;