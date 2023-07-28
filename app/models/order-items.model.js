const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const orderItemSchema = Schema({
  name: {
    type: String,
    minlength: [5, "panjang nama makanan minimal 5 karakter "],
    required: [true, "nama makanan harus diisi"],
  },
  price: {
    type: Number,
    required: [true, "harga makanan harus diisi"],
  },
  image: String,
  qty: {
    type: Number,
    required: [true, "kuantitas harus diisi"],
    min: [1, "kuantitas minimal 1"],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
});

module.exports = model("OrderItem", orderItemSchema);
