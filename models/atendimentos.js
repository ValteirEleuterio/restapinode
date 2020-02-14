const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
    
    adiciona(atendimento){
        

        return new Promise((resolve, reject) => {
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
            const erros = validacoes.filter(campo => !campo.valido);
            const existeErros = erros.length;

            if (existeErros) {
                reject(erros);
            } else {
                const atendimentoDatado = {...atendimento, dataCriacao, data};
                const sql = `INSERT INTO Atendimentos SET ?`;

                conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                    if (erro) {
                        reject(erro);
                    } else {
                        resolve(atendimento);
                    }
                });
            }
        });    
    }

    lista() {
        const sql = 'SELECT * FROM Atendimentos';
        return new Promise((resolve, reject) => 
            conexao.query(sql, (erro, resultados) => {
                if (erro) {
                    reject(erro);
                } else {
                    resolve(resultados);
                }
            })
        );
    }

    buscaPorId(id) {
        const sql = 'SELECT * FROM Atendimentos WHERE id = ?';
        return new Promise((resolve, reject) => 
            conexao.query(sql, id, (erro, resultados) => {
                if (erro) {
                    reject(erro);
                } else {
                    resolve(resultados[0]);
                }
            })
        );
    }

    altera(id, valores) {
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?'
        return new Promise((resolve, reject) => 
            conexao.query(sql, [valores, id], (erro, resultados) => {
                if (erro) {
                    reject(erro);
                } else {
                    resolve({...valores, id});
                }
            })
        );
    }

    deleta(id) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?'
        return new Promise((resolve, reject) => {
            conexao.query(sql, id, (erro, resultados) => {
                if (erro) {
                    reject(erro);
                } else {
                    resolve({id});
                }
            })
        });
    }
}

module.exports = new Atendimento;