/*importar as configurações do servidor*/
var app = require("./config/server.js");

/* parametrizar a porta de escuta */
var server = app.listen(8081, function(){
	console.log("Server ON");
});

/*instanciar websocket e coloca-lo ouvindo a mesma porta da aplicação*/
var io = require("socket.io").listen(server);

/*definindo io como variável global*/
app.set("io", io);

/* criar a conexão por websocket*/
io.on("connection", function(socket){
	var apelido = "";
	console.log("Usuário conectou");

	socket.on("disconnect", function(){
		console.log("Usuário desconectou");
		socket.broadcast.emit("msgParaCliente", {apelido: apelido, mensagem: "saiu do chat"});
	});

	socket.on("msgParaServidor", function(data){
		apelido = data.apelido;
		/*DIALOGO*/
		/*função emit só envia para o client que fez a requisição*/
		socket.emit("msgParaCliente", {apelido: data.apelido, mensagem: data.mensagem});
		/*broadcast.emit envia a mensagem para todos conectados no socket, menos para o client que fez a requisição*/
		socket.broadcast.emit("msgParaCliente", {apelido: data.apelido, mensagem: data.mensagem});

		/*PARTICIPANTES*/
		if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
			socket.emit("participanteParaCliente", {apelido: data.apelido});
			socket.broadcast.emit("participanteParaCliente", {apelido: data.apelido});
		}
	});

});