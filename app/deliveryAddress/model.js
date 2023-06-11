const { Schema, model } = require("mongoose");

const deleveryAddresSchema = Schema(
  {
    nama: {
      type: String,
      required: [true, "nama harus diisi"],
      maxlength: [255, "panjang maximal alamat adalah 255 karakter"],
    },
    kelurahan: {
      type: String,
      required: [true, "kelurahan harus diisi"],
      maxlength: [255, "pannjang maximal kelurahan adalah 255 karakter"],
    },
    kecamatan: {
      type: String,
      required: [true, "kecmatan harus diisi"],
      maxlength: [255, "panjang maximal kecamatan adalah 255 karakter"],
    },
    kabupaten: {
      type: String,
      required: [true, "kabupaten harus diisi"],
      maxlength: [255, "panjang maximal kabupaten adalah 255 karakter"],
    },
    provinsi: {
      type: String,
      required: [true],
      maxlength: [255, "panjang maximal provinsi adalah 255 karakter"],
    },
    detail: {
      type: String,
      required: [true, "detail alamat harus diisi"],
      maxlength: [1000, "panjang maximal detail adalah 1000 karakter"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("DeliveryAddres", deleveryAddresSchema);
