/* PASSO 1 importar as configurações do servidor */
var app = require('./config/server');

/* PASSO 2 parametrizar a porta de escuta */
app.listen(80,function(){
    console.log('Servidor online!');    
})
