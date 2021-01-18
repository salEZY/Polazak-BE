const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  name: {
    type: String,
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
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
});

module.exports = Purchase = mongoose.model("purchase", PurchaseSchema);
