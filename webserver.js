const Express = require("express");
class WebServer
{
    constructor()
    {
        this.httpServer = Express();
    }
    start(port)
    {
        this.port = port;
        this.httpServer.use(Express.static("public"));
        this.httpServer.use(Express.static("Front end"));
        this.httpServer.listen(port, function() {
            console.log("listening on port " + port);
        });
    }
}
module.exports = WebServer;