const mySecret = process.env['MESSAGE_STYLE']


var bodyParser = require("body-parser")
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended : false }));


app.get('/:word/echo', function(req, res) {
  const word = req.params.word;
  res.json({
    "echo": word
  });
});

//posting data from the html:
app.post('/name', (req, res)=>{
  res.json({
    "name" : req.body.first + " " + req.body.last
  })
})


//fetching data:
app.get('/name', (req, res)=>[
  res.json({
    "name" : req.query.first + " " + req.query.last
  })
]) 
app.route('/name').get((req, res)=>{
  res.first = req.query.first;
  res.last = req.query.last;
}).post((req, res)=>{
  res.json({
    "hi" : "hi"
  })
})

app.use(function(req, res, next) {
  // req.method returns the method, i.e. POST/GET/UPDATE;
  let reqMethod = req.method;
  // req.path refers to the request url:
  let reqPath = req.path;
  // req.ip refers to the IP of the request url:
  let reqIp = req.ip;

  console.log(reqMethod + " " + reqPath + " - " + reqIp);

  next();
})

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({
    "time": req.time
  })
})


// when we want to get something on the root, we are calling the function below:
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
})



app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({
    "message": message
  });
})

module.exports = app;
