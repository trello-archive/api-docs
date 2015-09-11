var path     = require('path'),
    express  = require('express'),
    app      = express(),
    port = process.env.PORT || 3333;

// these need to go first:
app.use("/scripts", express.static(__dirname + "/app/scripts"));
app.use("/images", express.static(__dirname + "/app/images"));
app.use("/styles", express.static(__dirname + "/app/styles"));
app.use("/templates", express.static(__dirname + "/app/templates"));
app.use("/favicon.ico", express.static(__dirname + "/app/favicon.ico"));
app.use("/google14ced388f548c29a.html", express.static(__dirname + "/app/google14ced388f548c29a.html"));
app.use("/robots.txt", express.static(__dirname + "/app/robots.txt"));

// any other routes:
app.all("/*", function(req, res, next) {
    res.sendFile("index.html", { root: __dirname + "/app" });
});


var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Trello Documentation listening at http://%s:%s', host, port);
});
