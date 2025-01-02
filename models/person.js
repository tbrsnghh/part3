const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
console.log("connecting to mongoDB");
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB!");
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
