var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/validateToken', function (req, res) {
  res.json({
    result: true,
  });
});

app.listen(3003, function () {
  console.log('Example app listening on port 3003!');
});
