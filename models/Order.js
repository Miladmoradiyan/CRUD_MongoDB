const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  coursId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cours",
    required: true,
  },
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
