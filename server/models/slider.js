const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SliderImageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    imageLink: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SliderImage", SliderImageSchema);
