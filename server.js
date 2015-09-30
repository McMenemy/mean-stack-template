var express = require("express");
var app = express();

app.use("/", function(req, res) {
    res.send("Hello World");
});

app.listen(process.env.PORT, process.env.IP);
console.log("server running");

module.exports = app;