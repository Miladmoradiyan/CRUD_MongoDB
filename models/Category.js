const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name_category: { type: String, required: true },
  title_category: { type: String, required: true },
});

module.exports = mongoose.model("Category", CategorySchema);
