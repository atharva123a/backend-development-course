const mongoose = require('mongoose');

const { Schema } = mongoose;
const myURI = process.env['MONGO_URI']

mongoose.connect(myURI, {
  // this tells mongoose to drop support for the old url parser:
  useNewUrlParser: true,

  // makes use of the mongodb new connection management engine:
  useUnifiedTopology: true
});

// define userSchema:
let userSchema = new Schema({
  username: String,
  // this is how we declare an array of objects in mongoose:
  log: [{
    description: String,
    duration: Number,
    date: String
  }]
})

// make use of this schema to create User object
let User = mongoose.model("User", userSchema);


// function to create and save url;
// we made use of it to handle post requests:
const createAndSaveUser = async (name, done) => {
  // check if the user already exists in our database:
  const exists = await User.exists({ username: name }, (err, data) => {
    if (err) return console.log(err);
    return data;
  });

  // if it exists, simply return it:
  if (exists) {
    const data = User.findOne({ username: name }, (err, data) => {
      if (err) return console.log(err);
      // returing data to our callback
      done(null, data);
    })
  }

  // create user if it does not already exist inside the User object:
  const user = new User({
    username: name,
  })

  // save user:
  await user.save((err, data) => {
    if (err) return console.log(err);

    // again data is passed to callback!
    done(null, data);
  })
};

const addAndSaveLog = async (_id, obj, done) => {
  
  // get the user using id:
  let user = await User.findById(_id).exec()

  // push the exercise in the log array 
  user.log.push(obj)
  
  // save exercise to database:
  await user.save((err, data)=>{
    if(err)return console.log(err);
    return data;
  })

  // return object in the desired format:
  
  const returnObj = {
    "_id": user._id,
    "username": user.username,
    "date" : (obj.date),
    "duration" : obj.duration,
    "description": obj.description
  }
  // return to the callback function:
  done(null, returnObj);
}


exports.createAndSaveUser = createAndSaveUser
exports.addAndSaveLog = addAndSaveLog;
exports.User = User;
