const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RidesSchema = new Schema({
  tier: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  riderWalletId: { type: String, required: true },
  price: { type: Number },
});

const ridesModel = model("Rides", RidesSchema);

module.exports = ridesModel;
