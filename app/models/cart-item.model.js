const mongoose = require("mongoose");

const cartItemsSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "nama harus diisi"],
  },

  qty: {
    type: Number,
    require: [true, "quantity harus diisi"],
  },

  price: {
    type: Number,
    require: [true, "price harus diisi"],
  },

  image_url: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = mongoose.model("CartItem", cartItemsSchema);
