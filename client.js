class Client{

    constructor(url){
        this.socket = new WebSocket(url);
    }

    sendLogin(userName, password){
        var info = {type:"login", userName, password};
        if(this.socket.readyState == WebSocket.OPEN){
            this.socket.send(JSON.stringify(info));
        }
    }
    //login
    //connect to server
    //request grades, classlist, assignment list, etc



}

var client;
window.addEventListener("load",function(){
    client = new Client();
})