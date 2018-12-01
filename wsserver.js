const WebSocket = require("ws");
class WSServer
{
    constructor() {}
    start(port)
    {
        this.server = new WebSocket.Server({
            port: 5524
        });
        this.server.on("connection", function(ws) {
            ws.on("message", function(msg) {
                console.log("client sent " + msg);
            });
        });
    }
}
module.exports = WSServer;