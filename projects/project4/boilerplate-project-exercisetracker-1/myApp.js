const mongoose = require('mongoose');

const { Schema } = mongoose;
const myURI = process.env['MONGO_URI']

mongoose.connect(myURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


let userSchema = new Schema({
  username : String
})

let User = mongoose.model("User", userSchema);

const createAndSaveUser = async (name, done) =>{
  const user = new User({
    username : name
  })

  await user.save((err, data) =>{
    if(err)return console.log(err);
    
    done(null, data);
  })
};

exports.createAndSaveUser = createAndSaveUser

exports.User = User;

