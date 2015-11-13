var path     = require('path'),
    express  = require('express'),
    app      = express(),
    port = process.env.PORT || 3333,
    env = process.env.NODE_ENV || 'development';

// Redirect if not on SSL
var forceSsl = function (req, res, next) {
	if (req.headers['x-forwarded-proto'] !== 'https') {
		return res.redirect(301, ['https://', req.get('Host'), req.originalUrl].join(''));
	}
	return next();
};

if (env === 'production') {
	app.use('*', forceSsl);
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// these need to go first:
app.use("/scripts", express.static(__dirname + "/app/scripts"));
app.use("/images", express.static(__dirname + "/app/images"));
app.use("/styles", express.static(__dirname + "/app/styles"));
app.use("/templates", express.static(__dirname + "/app/templates"));
app.use("/favicon.ico", express.static(__dirname + "/app/favicon.ico"));
app.use("/google14ced388f548c29a.html", express.static(__dirname + "/app/google14ced388f548c29a.html"));
app.use("/robots.txt", express.static(__dirname + "/app/robots.txt"));

// Sample Power-Up
app.use("/sample-power-up", express.static(__dirname + "/app/sample-power-up"));

// any other routes:
app.all("/*", function(req, res, next) {
    res.sendFile("index.html", { root: __dirname + "/app" });
});

var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Trello Documentation listening at http://%s:%s in %s', host, port, env);
});
