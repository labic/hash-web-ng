var express  = require('express');
var app      = express();

app.use(express.static(__dirname));

var PORT = (8080 || process.env.PORT);
app.listen(PORT);

app.get('/', function (req, res) {
  res.sendfile('./index.html');
});

console.log('App listening on port ' + PORT);