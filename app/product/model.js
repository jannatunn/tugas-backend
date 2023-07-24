const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const productSchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, "panjang nama makanan minimal 3 karakter"],
      required: [true, "nama makanan harus diisi"],
    },
    price: {
      type: Number,
      required: [true, "harga harus diisi"],
    },

    image_url: String,

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
