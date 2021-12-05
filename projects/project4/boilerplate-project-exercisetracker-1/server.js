const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const router = express.Router();
const bodyParser = require("body-parser");

// for parsing url data:
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

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


app.get('/api/users', async(req, res, next)=>{  


    // find all users and simply push their ids and usernames to our object array:
    User.find({}, (err, users)=>{
      // user array to store our users:
      let userArr = [];

      users.forEach((user) =>{
        userArr.push({
          "username" : user.username,
          "_id" : user._id
        });
      })
      // return our user array:
      res.json(userArr);
    })

})

const addAndSaveLog = require('./myApp.js').addAndSaveLog;


app.post('/api/users/:_id/exercises', async(req, res, next)=>{
  // get all the parameters required in the log:
  let description = req.body.description;
  let duration = parseInt(req.body.duration);
  let date = req.body.date;
  
  // check if user has entered date or not:
  if(date == ''){
    // if not return the current date and time in human readable format toDateString();
    date = (new Date()).toDateString();
  }
  else {
    // else use the original date and convert it to a string:
    date = (new Date(date)).toDateString()
  }
  // for passing into the database:
  const obj = {
    "description" : description,
    "duration" : duration,
    "date" : date
  }
  // this will save the log to our database:
  await addAndSaveLog(req.params._id, obj, (err, data)=>{
    if(err)return console.log(err);
    
    // return object which is in the required format:
    res.json(data);
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
