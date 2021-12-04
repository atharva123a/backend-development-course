const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const router = express.Router();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : false}))

try {
  mongoose = require("mongoose");
}catch(e){
  console.log(e);
}

const TIMEOUT = 10000;

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const User = require("./myApp.js").User;

const createUser = require("./myApp.js").createAndSaveUser;

app.post('/api/users', async(req, res, next) => {
  // this is a timeout function to return timeout done to check if we made a wrong call:
  let t = setTimeout(() => {
    next({ "message": "timeout" })
  }, TIMEOUT)

  // the username entered through the form is accessed as:
  const name = req.body.username;
  
  const exists = await User.exists({username : name});

  if(exists){
    const data = await User.findOne({username : name}, (err, data)=>{
      if(err){
        return console.log(err);
      }
      res.json({
      "username" : data.username,
      "_id" : data._id
    })
    });
  }
  
  // we make a call here to function in app.js and pass value of username to create new user with username equal to this value:
  const data = createUser(name, (err, data) => {
    // we made the right call:
    clearTimeout(t);
    if (err) {
      return next(err);
    }
    // since user is already created we simply return 
    // it from our database:
    User.findById(data._id, (err, user)=>{
      if(err){
        next(err);
      }

      // returned according to the required format:
      res.json({
        "username" : user.username,
        "_id" : user._id
      })
    })
  });

})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
