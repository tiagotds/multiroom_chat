module.exports.iniciaChat = function(application, req, res){
	
	var dadosForm = req.body;
	req.assert("apelido", "Nome ou apelido é obrigatório").notEmpty();
	req.assert("apelido", "Nome ou apelido deve conter entre 3 e 15 caracteres").len(3, 15);

	var errors = req.validationErrors();
	if(errors){
		//res.send("Existem erros no formulário");
		//res.send encerra o processamento da função, portanto não é necessário dar return;
		//qualquer outro comando diferente de res.send, atribuir return logo em seguida, senão vai continuar executando

		res.render("index", {validacao: errors});
		return;
	}

	/*obtendo variável global*/
	var io = application.get("io");

	io.emit("msgParaCliente", {"apelido": dadosForm.apelido, "mensagem": "acabou de entrar no chat"});

	res.render("chat", {dadosForm: dadosForm});
}