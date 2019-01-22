/* PASSO 1 importar as configurações do servidor */
var app = require('./config/server');

/* PASSO 2 parametrizar a porta de escuta */
var server = app.listen(80,function(){
                console.log('Servidor online!');    
            })
//inicializando o socket.io
var io = require('socket.io').listen(server);

//declarando variável global para o IO (requisições e respostas do socket)
app.set('io',io);

io.on('connection',function (socket) {
    console.log('Usuário conectou');    

    socket.on('disconnect',function (socket) {
        console.log('Usuário desconectou');
    })
// escutando a mensagem que vem do cliente para o servidor digitada pelo usuario e clicada no enviar
    socket.on('msgParaServidor', function (callbackDoClient) {
        //aqui ENVIA/EXECUTA os dados de volta par ao cliente, respondendo a requisição msgParaServidor que vem no on() de lá
       socket.emit('msgParaCliente',
                    {apelido : callbackDoClient.apelido,
                    mensagem : callbackDoClient.mensagem}
                ) ;
        //a funcao nativa do broadcast do SOCKET.IO
        socket.broadcast.emit('msgParaCliente',
                    {apelido : callbackDoClient.apelido,
                    mensagem : callbackDoClient.mensagem}
            ) ;
        
        //Lista de participantes
        if (parseInt(callbackDoClient.apelido_atualizado_nos_clientes) == 0)    {
        socket.emit('ParticipantesParaCliente',
        {apelido : callbackDoClient.apelido}        ) ;
        //a funcao nativa do broadcast do SOCKET.IO
        socket.broadcast.emit('ParticipantesParaCliente',
                    {apelido : callbackDoClient.apelido}
            ) ;
    }});
})