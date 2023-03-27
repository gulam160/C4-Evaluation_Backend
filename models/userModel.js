const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
  age: Number,
  city: String,
  is_married: Boolean,
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);

  this.token = this.token.concat({ token: token });
  await this.save();
  return token;
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
