const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  name_subcategory: { type: String, required: true },
  title: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);
