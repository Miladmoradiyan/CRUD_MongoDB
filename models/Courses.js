const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  cours_name: { type: String, required: true },
  title: { type: String, required: true },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  sub_categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  price: { type: Number, required: true },
  time: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Cours", coursesSchema);
