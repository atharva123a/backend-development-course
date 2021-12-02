// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// returns utc from unix:
function convertToUtc(unix) {

  let utc = "";
  let d = new Date(unix).toString();
  d = d.split(' ');
  utc += (d[0] + ", " + d[2] + " " + d[1] + " " + d[3] + " " + d[4] + " GMT")
  return utc;
}

// your first API endpoint... 
app.get("/api/:date", function(req, res) {

  const time = (req.params.date);

  const arr = time.split('-');
  let unix, utc = "";

  if (arr.length > 1) {
    // conver the utc to unix:

    let a = arr.join('.')
    if (isNaN(new Date(a))) {
      res.json({
        "error": "Invalid Date"
      })
    }
    unix = parseInt((new Date(a)).getTime())
      ;
  }
  else {
    unix = parseInt(time)
  }
  utc = convertToUtc(unix)
  res.json({
    "unix": unix, "utc": utc
  })

});

app.get('/api', (req, res) => {
  let unix = Date.now();
  let utc = convertToUtc(parseInt(unix));
  res.json({
    "unix": unix , "utc": utc
  });
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
