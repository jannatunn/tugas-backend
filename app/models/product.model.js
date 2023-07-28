const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "nama makanan harus diisi"],
    },

    price: {
      type: Number,
      require: [true, "harus mencantumkan harga product"],
    },

    image_url: String,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
