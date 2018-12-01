const WSServer = require("./wsserver.js");
const WebServer = require("./webserver.js");
const School = require("./school.js");

var school = new School();
var webServer = new WebServer();
var wsServer = new WSServer();
webServer.start(8080);
wsServer.start(5524);