const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Student", studentSchema);
