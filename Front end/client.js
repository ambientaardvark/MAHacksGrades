class Client{

    constructor(url){
        this.socket = new WebSocket(url);
        var cl = this;
        this.socket.onopen = function(openev) {
            cl.socket.onmessage = function(ev) {
                var msgobj = JSON.parse(ev.data);
                switch(msgobj.type)
                {
                    case "token":
                        msgobj.token
                        break;
                    default:
                        break;
                }
            }
        }
    }

    sendLogin(userName, password){
        if(this.ready())
        {
            var info = {type:"login", userName, password};
            this.socket.send(JSON.stringify(info));
        }
    }
    sendCreate(username, password, firstname, lastname, perms)
    {
        if(this.ready())
        {
            var info = {
                type: "createUser",
                token: this.token,
                userName: username,
                password: password,
                firstName: firstname,
                lastName: lastname,
                permissionLevel: perms
            };
            this.socket.send(JSON.stringify(info));
        }
    }
    ready()
    {
        return this.socket.readyState === WebSocket.OPEN;
    }
    //login
    //connect to server
    //request grades, classlist, assignment list, etc



}

