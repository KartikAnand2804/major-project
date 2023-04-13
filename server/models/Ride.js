const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RidesSchema = new Schema({
  tier: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  riderWalletId: { type: String, required: true },
  driverWalletId: { type: String },
  price: { type: Number },
  status: { type: String },
});

const ridesModel = model("Rides", RidesSchema);

module.exports = ridesModel;
