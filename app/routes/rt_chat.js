module.exports = function (application) {
    
    application.post('/chat',function(req, res){
        application.app.controllers.ct_chat.iniciaChat(application, req, res);
    });

    application.get('/chat',function(req, res){
        application.app.controllers.ct_chat.iniciaChat(application, req, res);
    });

}