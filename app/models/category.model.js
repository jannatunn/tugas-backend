const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "nama category harus diisi"],
  },

  image_url: String,
});

module.exports = mongoose.model("Category", categorySchema);
