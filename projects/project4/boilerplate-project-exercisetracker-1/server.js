const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const router = express.Router();
const bodyParser = require("body-parser");

// for parsing url data:
app.use(bodyParser.urlencoded({ extended: false }))

try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}

// timeout to check if the callback is made correctly and we just don't keep waiting for the response:
const TIMEOUT = 10000;

// cors allow FCC or anyone else really access to the url:
app.use(cors())
// returns homepage:
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const User = require("./myApp.js").User;

const createUser = require("./myApp.js").createAndSaveUser;

app.post('/api/users', async (req, res, next) => {
  // this is a timeout function to return timeout done to check if we made a wrong call:
  let t = setTimeout(() => {
    next({ "message": "timeout" })
  }, TIMEOUT)

  // the username entered through the form is accessed as:
  const name = req.body.username;

  // make a call to createUser and return an error or data in required form:
  await createUser(name, (err, data)=>{
    if(err)return console.log(err);

    res.json({
      "username" : data.username,
      "_id" : data._id
    });
  })
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const router = express.Router();
const bodyParser = require("body-parser");

// for parsing url data:
app.use(bodyParser.urlencoded({ extended: false }))

try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}

// timeout to check if the callback is made correctly and we just don't keep waiting for the response:
const TIMEOUT = 10000;

// cors allow FCC or anyone else really access to the url:
app.use(cors())
// returns homepage:
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const User = require("./myApp.js").User;

const createUser = require("./myApp.js").createAndSaveUser;

app.post('/api/users', async (req, res, next) => {
  // this is a timeout function to return timeout done to check if we made a wrong call:
  let t = setTimeout(() => {
    next({ "message": "timeout" })
  }, TIMEOUT)

  // the username entered through the form is accessed as:
  const name = req.body.username;

  // make a call to createUser and return an error or data in required form:
  await createUser(name, (err, data)=>{
    if(err)return console.log(err);

    res.json({
      "username" : data.username,
      "_id" : data._id
    });
  })
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
