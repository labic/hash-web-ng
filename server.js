var express  = require('express');
var app      = express();

app.use(express.static(__dirname + '/app'));

app.listen(8080);

app.get('/', function (req, res) {
  res.sendfile('./app/index.html');
});

console.log("App listening on port 8080");