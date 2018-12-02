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
                var tokenValidity = false;
                if(function(){
                    for (let index = 0; index < wss.sessionList.length; index++) {
                        const element = wss.sessionList[index];
                        if(data.token==element.token){
                            return true;
                        }
                    }
                    return false;
                }()){
                    tokenValidity = true;
                }
                if(!tokenValidity && data.type != "login"){
                    return;
                }
                var tempUser;
                for (let index = 0; index < wss.sessionList.length; index++) {
                    const element = wss.sessionList[index];
                    if(wss.sessionList.token == data.token){
                        tempUser = element.user;
                        break;
                    }
                }
                switch (data.type) {
                    case "login":
                        for (let index = 0; index < wss.school.userList.length; index++) {
                            const element = wss.school.userList[index];
                            if(element.userName == data.userName){
                                if(element.password == data.password){
                                    let session = wss.createSession(element);
                                    ws.send(JSON.stringify({type:"token", token: session.token}));
                                }
                            }
                        }
                        break;
                        
                    case "requestCourseList":
                    {
                        let tempCourseList = [];
                        for (let index = 0; index < wss.school.courseList.length; index++) {
                            const element = wss.school.courseList[index];
                            tempCourseList.push(element.getData(tempUser));
                        }
                        ws.send(JSON.stringify({type:"courseList", courseList: tempCourseList}));
                    }
                        break;

                    case "requestUserCourseList":
                    {
                        let tempCourseList = [];
                        for (let index = 0; index < tempUser.courseList.length; index++) {
                            const element = tempUser.courseList[index];
                            tempCourseList.push(element.getData(tempUser));
                        }
                        ws.send(JSON.stringify({type:"userCourseList", userCourseList: tempCourseList}));
                    }
                        break;

                    case "requestCourseInfo":
                        let tempCourseInfo;
                        if(tempUser.permissionLevel>0){
                            for(let i= 0; i< wss.school.courseList.length;i++){
                                tempCourseInfo.push(wss.school.courseList[i].getData(tempUser));
                            }  
                        }else{
                            for(let i = 0; i < tempUser.courseList.length;i++){
                                tempCourseInfo.push(tempUser.courseList[i].getData(tempUser));
                            }
                        }
                        ws.send(JSON.stringify({type:"courseInfo", courseInfo: tempCourseInfo}));
                        break;

                    case "requestAssignmentList":

                        break;

                    case "requestAssignmentInfo":

                        break;

                    case "requestSchoolInfo":

                        break;

                    case "requestStudentList":

                        break;

                    case "requestStudentInfo":

                        break;

                    case "createUser":
                        wss.school.createUser(username, password, firstname, lastname);
                        break;
                       
                    case "createCourse":

                        break;
                           
                    case "createAssignment":

                        break;
                    
                    case "completeUser":
                        tempUser.schoolName = msgobj.school;
                        tempUser.permissionLevel = msgobj.permissionLevel;
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