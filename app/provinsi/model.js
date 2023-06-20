const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let provinsiSchema = Schema({
  name: {
    type: String,
    required: [true, "nama provinsi harus diisi"],
  },
});

module.exports = model("Provinsi", provinsiSchema);
