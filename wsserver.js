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
                if(!tokenValidity && !(data.type == "login" || data.type == "createUser")){
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
                    {
                        var succeeded = false;
                        for (let index = 0; index < wss.school.userList.length; index++) {
                            const element = wss.school.userList[index];
                            if(element.userName == data.userName){
                                if(element.password == data.password){
                                    let session = wss.createSession(element);
                                    ws.send(JSON.stringify({type:"token", token: session.token}));
                                    succeeded = true;
                                }
                            }
                        }
                        ws.send(JSON.stringify({
                            type:"login",
                            succeeded: succeeded
                        }));
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

                    case "requestAssignmentList":
                    {
                        let tempUseableList = wss.school.getCourse(data.courseId).assignmentList;
                        let tempAssigmentList;
                        for(let i = 0; i < tempUseableList.length; i++){
                            tempAssignmentList.push(tempUseableList[i].getData(tempUser.id));
                        }
                        ws.send(JSON.stringify({type:"assignmentList", assignmentList: tempAssigmentList}));
                    }
                        break;

                    case "requestSchoolInfo":
                    {
                        let tempSchoolInfo = wss.school.getData(tempUser);
                        ws.send(JSON(stringify({type:"schoolInfo",schoolInfo: tempSchoolInfo})));
                    }
                        break;

                    case "requestStudentList":
                    {
                        let tempUserList;
                        if(tempUser.permissionLevel>0){
                            for(let i = 0; i < wss.school.userList.length; i++){
                                if(wss.school.userList[i].permissionLevel==0){
                                    tempUserList.push(wss.school.userList[i].getData());
                                }
                            }
                        }
                        ws.send(JSON(stringify({type:"studentList",studentList: tempUserList})));
                    }
                        break;

                    case "requestTeacherList":
                    {
                        let tempUserList;
                        if(tempUser.permissionLevel>0){
                            for(let i = 0; i < wss.school.userList.length; i++){
                                if(wss.school.userList[i].permissionLevel==1){
                                    tempUserList.push(wss.school.userList[i].getData());
                                }
                            }
                        }
                        ws.send(JSON(stringify({type:"teacherList",teacherList: tempUserList})));
                    }
                        break;
                        
                    case "requestAdministratorList":
                    {
                        let tempUserList;
                        if(tempUser.permissionLevel>0){
                            for(let i = 0; i < wss.school.userList.length; i++){
                                if(wss.school.userList[i].permissionLevel==2){
                                    tempUserList.push(wss.school.userList[i].getData());
                                }
                            }
                        }
                        ws.send(JSON(stringify({type:"administratorList",administratorList: tempUserList})));
                    }
                        break;

                    //data must include user id
                    case "requestUserInfo":
                    {
                        let tempStudentInfo;
                        if(tempUser.permissionLevel>0){
                            for(let i = 0; i < wss.school.userList.length; i++){
                                if(wss.school.userList[i].id = data.userId){
                                    tempStudentInfo = wss.school.userList[i].getData();
                                }
                            }
                        }
                        ws.send(JSON(stringify({type:"userInfo",userInfo: tempStudentInfo})));
                    }
                        break;

                    case "createUser":
                    {
                        let user = wss.school.createUser(data.userName, data.password, data.firstName, data.lastName);
                        //login now that we have enough information
                        let session = wss.createSession(user);
                        ws.send(JSON.stringify({type:"token", token: session.token}));
                    }
                        break;
                       
                    case "createCourse":
                    {
                        let course = wss.school.createCourse(data.name, data.ownerList);
                    }                
                        break;
                    
                    case "createAssignment":
                    {
                        let assignment = data.course.createAssignment(data.name, data.maximumGrade);
                    }
                        break;
                    
                    case "completeUser":
                    {
                        tempUser.schoolName = data.school;
                        tempUser.permissionLevel = data.permissionLevel;
                    }
                        break;
                       
                    default:
                        break;
                }
            });
        });
    }
    createSession(user){
        let token = this.generateToken();
        let session = {user, token};
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