require('dotenv').config();
let mongoose = require('mongoose');
const { Schema } = mongoose;
// while connecting make sure that no quotes are being used
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: []
})

let Person = mongoose.model("Person", personSchema);


// async because we have to await the save method
const createAndSavePerson = async (done) => {
  const person = new Person({
    name: "Atharva Salokhe",
    age: 19,
    favoriteFoods: ["misal", "wadavpav"]
  })
  await person.save((err, data) => {
    if (err) done(err);
    done(null, data);
  })

};



const arrrayOfPeople = [
  { name: "Atharva", age: 19, favoriteFoods: ['wadapav', 'misal'] },
  { name: "Advait", age: 17, favoriteFoods: ['burger', 'pizza'] },
  { name: "Mamma", age: 43, favoriteFoods: ['puranpoli', 'burger'] }
]

// creates new person objects!
const createManyPeople = async (arrayOfPeople, done) => {

  const data = await Person.create(arrayOfPeople, (err, people) => {
    if (err) console.log(err);

    done(null, people);
  }
  )
  done(null, data);
};

const personName = "Atharva";

const findPeopleByName = async (personName, done) => {

  await Person.find({ name: personName }, (err, people) => {
    if (err) console.log(err);

    done(null, people);
  })

};

let food = "misal";

// we can find peopel with unique property values:
// findOne returns a single object!

const findOneByFood = async (food, done) => {
  await Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) console.log(err);
    done(null, person);
  })

};

const findPersonById = async(personId, done) => {
  await Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    done(null, person);
  });
};

const findEditThenSave = async(personId, done) => {
  const foodToAdd = "hamburger";

  const updtPer = await Person.findById(personId, async(err, person) => {
    if (err) return console.log(err);

    await person.favoriteFoods.push(foodToAdd);

    await person.save((err, updatedPer) => {
      if (err) return console.log(err);
      done(null, updatedPer);
    })
  })


};

const findAndUpdate = async(personName, done) => {
  const ageToSet = 20;
  // {new:true} returns the updated document instead of the original one with is returned as default!
  await Person.findOneAndUpdate({name : personName}, {age : ageToSet}, {new : true}, (err, data)=>{
    if(err)return console.log(err);

    done(null, data);
  });
};

const removeById = async(personId, done) => {

  await Person.findByIdAndRemove(personId, (err, data) =>{
    if(err)return console.log(err);

    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  
  Person.remove({name : nameToRemove}, (err, res)=>{
    if(err)return console.log(err);
    done(null, res);
  })
  // done(null, data);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  Person.find({favoriteFoods : {$all : foodToSearch}}).sort("name").limit(2).select('name').exec((err, data)=>{
    if(err)return console.log(err);

    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
