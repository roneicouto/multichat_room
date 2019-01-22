module.exports.iniciaChat = function (application, req, res) {
   
    //iniciando o bodyParser
   var dadosForm = req.body;

   //usando ExpressValidator
   req.assert('apelido','Login não pode ser vazio').notEmpty();
   req.assert('apelido','o nome de usuário deve ter entre 3 e 15 caracteres').len(3,15);

   var erros = req.validationErrors();
   if (erros){
       res.render('vs_index', {validacao : erros});
       return;   //qndo é SEND o metodo, não precisa desse return, os demais é necessário, aqui por padrão!
   }
//.EMIT porque aqui o servidor está ENVIANDO/EXECUTANDO algo para os clientes
   application.get('io').emit(
                            'msgParaCliente',
                            {apelido : dadosForm.apelido, mensagem: ' acabou de entrar no chat'});  

   res.render('vs_chat', 
              {dadosForm : dadosForm}
              );
}