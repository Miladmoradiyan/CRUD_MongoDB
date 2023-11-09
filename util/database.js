const mongoose = require("mongoose");
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((value) => console.log("Connected to database"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
