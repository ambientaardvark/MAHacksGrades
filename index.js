const WSServer = require("./wsserver.js");
const WebServer = require("./webserver.js");
const School = require("./school.js");

var school = new School("ahs", "not here lul", "mr man", "mrman@grades.tech", "pleasehelpme@grades.tech");
var webServer = new WebServer();
var wsServer = new WSServer(school);
webServer.start(80);
wsServer.start(5524);

var mathCourse = wsServer.school.createCourse("Math", [-1]);
var assA = mathCourse.createAssignment("big exam", 100, 2);
var assB = mathCourse.createAssignment("homework", 10, 3);

var userA = wsServer.school.createUser("bob", "4", "bob", "bobson");
var userA2 = wsServer.school.createUser("bob2", "42", "bob2", "bobson2");

//mathCourse.studentList.push(userA.id, userA2.id);
mathCourse.addUser(userA);
mathCourse.addUser(userA2);
assA.setGrade(userA.id, 75);
assA.setGrade(userA2.id, 99);

assB.setGrade(userA.id, 8);
assB.setGrade(userA2.id, 10);
