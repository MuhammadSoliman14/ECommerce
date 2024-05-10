const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true , unique:[true,'product name cannot be duplicated'],},
    desc: { type: String, required: true, },
    img: { type: String, required: false },
    categories: { type: Array },
    size: { type: String},
    color: { type: String },
    price: { type: Number, required: true },
    quantity:{type:Number , default : 1}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);