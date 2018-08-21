let express = require("express");
let app = express();
let server = require("http").Server(app);
console.log("CLIENT STARTED");

//game
app.use(express.static(__dirname));
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/html/index.html");
});

server.listen(3000);
console.log("CLIENT LISTENING");
