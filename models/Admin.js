const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Admin", adminSchema);
