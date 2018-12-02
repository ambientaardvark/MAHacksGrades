const WSServer = require("./wsserver.js");
const WebServer = require("./webserver.js");
const School = require("./school.js");

var school = new School("ahs", "not here lul", "mr man", "mrman@grades.tech", "pleasehelpme@grades.tech");
var webServer = new WebServer();
var wsServer = new WSServer(school);
webServer.start(8080);
wsServer.start(5524);