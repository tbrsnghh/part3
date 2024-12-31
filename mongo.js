const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://nhham1771:${password}@persons.4ua7h.mongodb.net/?retryWrites=true&w=majority&appName=persons`;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    });
    const Person = mongoose.model("Person", personSchema);
    // create a new person object
    if (name && number) {
      const person = new Person({
        name: name,
        number: number,
      });
      // save the person object to mongoDB
      person
        .save()
        .then((result) => {
          console.log("added " + name + " number " + number + " to phonebook");
          mongoose.connection.close();
        })
        .catch((err) => {
          console.error("Error saving person:", err);
          mongoose.connection.close();
        });
    } else {
      Person.find({})
        .then((result) => {
          console.log("phonebook:");
          result.forEach((person) => {
            console.log(person.name + " " + person.number);
          });
          mongoose.connection.close();
        })
        .catch((err) => {
          console.error("Error fetching persons:", err);
          mongoose.connection.close();
        });
    }
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB!");
  });
