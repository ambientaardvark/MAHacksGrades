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
                        cl.emit("token", [msgobj.token]);
                        cl.token = msgobj.token;
                        break;
                    case "login":
                        cl.emit("login", [msgobj.succeeded]);
                        break;
                    case "courseList":
                        cl.emit("courseList", [msgobj.courseList])
                        break;
                    case "userCourseList":
                        cl.emit("userCourseList", [msgobj.userCourseList])
                        break;
                    case "assignmentList":
                        cl.emit("assignmentList", [msgobj.assignmentList])
                        break;
                    case "schoolInfo":
                        cl.emit("schoolInfo", [msgobj.schoolInfo])
                        break;
                    case "studentList":
                        cl.emit("studentList", [msgobj.studentList])
                        break;
                    case "teacherList":
                        cl.emit("teacherList", [msgobj.teacherList])
                        break;
                    case "administratorList":
                        cl.emit("administratorList", [msgobj.administratorList])
                        break;
                    case "userInfo":
                        cl.emit("userInfo", [msgobj.userInfo])
                        break;
                    case "schoolInfo":
                        cl.emit("schoolInfo", [msgobj.schoolInfo])
                        break;
                    
                    default:
                        break;
                }
            }
        }
        this.events = {};
    }
    emit(event, argList)
    {
        if(typeof this.events[event] != "undefined")
        {
            var evlist = this.events[event];
            for(var i = 0; i < evlist.length; i++)
            {
                if(typeof evlist[i] != "undefined")
                {
                    evlist[i](...argList);
                }
            }
        }
    }
    addEventListener(event, action)
    {
        if(typeof this.events[event] == "undefined")
        {
            this.events[event] = [action];
        }
        else
        {
            this.events[event].push(action);
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