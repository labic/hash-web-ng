var express  = require('express');
var app      = express();

app.use(express.static(__dirname + '/app'));

var PORT = process.env.PORT || 8080;
app.listen(PORT);

app.get('/', function (req, res) {
  res.sendfile('./index.html');
});

console.log('App listening on port ' + PORT);
