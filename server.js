process.env.NODE_ENV = process.env.NODE_ENV || "development";

var express = require("./config/express");
var app = express();

app.listen(process.env.PORT, process.env.IP);

module.exports = app;

console.log("server running");