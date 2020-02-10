module.exports = app => {
    app.get('/atendimentos', (req, resp) => resp.send('Você está na rota de atendimentos e está realizando um GET'));

    app.post('/atendimentos', (req, resp) => resp.send('Você está na rota de atendimentos e está realizando um POST'));
}