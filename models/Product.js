const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
});

module.exports = Product = mongoose.model("products", ProductSchema);
