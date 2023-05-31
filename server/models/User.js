const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  carNumber: { type: String },
  typeOfUser: { type: String, required: true },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
