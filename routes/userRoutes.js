const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
userRouter.post("/register", (req, res) => {
  const payload = req.body;
  const { password } = payload;
  try {
    bcrypt.hash(password, 3, async (err, hash) => {
      if (err) {
        res.status(400).send({ error: err.message });
      } else {
        const user = new UserModel({ ...payload, password: hash });
        await user.save();
        res.send({ msg: "registration successfull" });
      }
    });
  } catch (err) {
    res.status(400).send({ msg: "registration failed", error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user[0]._id }, "social");
          res.send({ msg: "Login successful", token: token });
        } else {
          res.send({ msg: "wrong login details" });
        }
      });
    } else {
      res.send({ msg: "wrong details" });
    }
  } catch (err) {
    res.send({ msg: "something went wrong", error: err.message });
  }
});
module.exports = { userRouter };
