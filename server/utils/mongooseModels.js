const mongoose = require("mongoose");

const ShoesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = {
  Shoe: mongoose.model("Shoe", ShoesSchema)
};
