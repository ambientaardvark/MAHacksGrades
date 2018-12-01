const Express = require("express");

var port = 8080;
var httpServer = Express();
httpServer.use(Express.static("public"));
httpServer.listen(port, function() {
    console.log("listening on port " + port);
});