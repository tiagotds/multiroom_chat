/*importar as configurações do servidor*/
var app = require("./config/server.js");

/* parametrizar a porta de escuta */
app.listen(8081, function(){
	console.log("Server ON");
});