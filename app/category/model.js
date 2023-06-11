const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema({
  name: {
    type: String,
    minlength: [3, "panjang minimal category minimal 3 karakter"],
    maxlength: [20, "panjang minimal category maximal 20 karakter"],
    required: [true, "nama kategoru harus diisi"],
  },
});

module.exports = model("Category", categorySchema);
