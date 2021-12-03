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


// returns utc from unix in the desired format:
function convertToUtc(unix) {

  let utc = "";
  let d = new Date(unix).toString();
  d = d.split(' ');
  utc += (d[0] + ", " + d[2] + " " + d[1] + " " + d[3] + " " + d[4] + " GMT")
  return utc;
}

// your first API endpoint... 
app.get("/api/:date", (req, res) => {
  // unix/utc to be returned if date string is valid:
  let unix, utc;
  let date = req.params.date;

  // x returns Invalid Date if the string is invalid:
  let x = Date.parse(date).toString();
  // y returns NaN if the date int is invalid else returns unix itself:
  let y = new Date(parseInt(date)).getTime()
 if(x != "NaN"){

    // passing an int to convert it to utc:
   unix = parseInt(new Date(date).getTime());
 }
 else if(y == date){
   unix = parseInt(date);
 }
 else {
   // handles all corner cases:
   res.json({
     "error" : "Invalid Date"
   })
 }
 utc = convertToUtc(unix);
 res.json({
   "unix" : unix,
   "utc" : utc
 })

});

// handles empty routes by returning the current date 
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
