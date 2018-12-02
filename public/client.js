class Client{

    constructor(url){
        this.socket = new WebSocket(url);
        var cl = this;
        this.socket.onopen = function(openev) {
            cl.socket.onmessage = function(ev) {
                console.log("we got " + ev.data);
                var msgobj = JSON.parse(ev.data);
                switch(msgobj.type)
                {
                    case "token":
                        cl.token = msgobj.token;
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
    sendCreateUser(username, password, firstname, lastname)
    {
        if(this.ready())
        {
            var info = {
                type: "createUser",
                token: this.token,
                userName: username,
                password: password,
                firstName: firstname,
                lastName: lastname
            };
            this.socket.send(JSON.stringify(info));
        }
    }
    sendCompleteUser(schoolname, perms)
    {
        if(this.ready())
        {
            var info = {
                type: "completeUser",
                token: this.token,
                school: schoolname,
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

