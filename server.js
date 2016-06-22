var express = require('express')
var app = express()
var cookieParser = require('cookie-parser');
var request = require('request');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser());

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.get('/validateToken', function (req, res) {
  var options = {
    url: 'https://api-staging.shoprunner.com/validateToken',
    qs: {
      srtoken: req.query.srtoken
    },
    auth: {
      user: 'bloom@shoprunner.com.srstg',
      password: '2016Spring'
    },
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
  };
  request(options, (error, response, body) => {
    if(error) {
      return res.json({
        result: false,
      });
     }
     parser.parseString(body, (err, result) => {
       console.log(body);
       res.cookie('sr_token', req.query.srtoken);
       return res.json({
         result: result['sr:validateTokenResponse']['sr:validationResult'][0] === 'true',
       });
     });
  })
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
