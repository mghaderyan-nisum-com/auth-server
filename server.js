var express = require('express')
var app = express()
var cookieParser = require('cookie-parser');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser());

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.get('/validateToken', function (req, res) {
  res.cookie('sr_token', req.query.srtoken)
  res.json({
    result: true,
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
