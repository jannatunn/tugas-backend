const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

// Definisi Schema userSchema
const userSchema = Schema(
  {
    full_name: {
      type: String,
      required: [true, "nama harus diisi"],
      maxlength: [255, "panjang nama harus antara 3 - 255 karakter"],
      minlength: [3, "panjang nama harus antara 3 - 255 karakter"],
    },

    email: {
      type: String,
      required: [true, "email harus diisi"],
      maxlength: [255, "panjang email maximal 255 karakter"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Format email tidak valid",
      ],
    },

    password: {
      type: String,
      required: [true, "password harus diisi"],
      minlength: [8, "panjang password minimal 8 karakter"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    token: [String],
  },
  { timestamps: true }
);

const HASH_ROUND = 10;
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = model("User", userSchema);
