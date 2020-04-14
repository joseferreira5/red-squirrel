const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema(
  {
    name: { type: String, required: true },
    imgURL: { type: String },
    description: { type: String, required: true },
    preferredQty: { type: String, required: true },
    onHandQty: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('items', Item);
