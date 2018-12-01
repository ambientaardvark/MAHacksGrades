const WebSocket = require("ws");
class WSServer
{
    constructor(school) {
        this.school = school;
        this.sessionList = [];
    }
    start(port)
    {
        this.server = new WebSocket.Server({
            port: 5524
        });
        var wss = this;
        this.server.on("connection", function(ws) {
            ws.on("message", function(msg) {
                console.log("client sent " + msg);
                var data = JSON.parse(msg);
                switch (data.type) {
                    case "login":
                        for (let index = 0; index < this.school.userList.length; index++) {
                            const element = this.school.userList[index];
                            if(element.userName == data.userName){
                                if(element.password == data.password){
                                    let session = wss.createSession(element);
                                    ws.send(JSON.stringify({type:"token", token: session.token}));
                                }
                            }
                        }
                        break;
                
                    default:
                        break;
                }
            });
        });
    }
    createSession(user){
        token = this.generateToken();
        session = {user, token};
        this.sessionList.push(session);
        return session;
    }
    generateToken(){
        var token = "";
        for(let i = 0; i < 8; i++){
            token += Math.floor(Math.random()*10);
        }
        return token;
    }
}
module.exports = WSServer;