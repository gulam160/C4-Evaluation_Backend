const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PostModel } = require("../models/postModel");
const postRouter = express.Router();

//GET
postRouter.get("/", async (req, res) => {
  let posts;
  const query = req.query;
  const userID = req.body.userID;
  try {
    if (query.device) posts = await PostModel.find({ device: query.device });
    else if (query.device1 && query.device2)
      posts = await PostModel.find({
        $and: [{ device1: query.device1 }, { device2: query.device2 }],
      });
    else posts = await PostModel.find({ userID: userID });

    res.send(posts);
  } catch (err) {
    res.send({ msg: "Post can't be accessed", error: err.message });
  }
});
postRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const post = new PostModel(payload);
    await post.save();
    res.send({
      msg: "Post added",
    });
  } catch (err) {
    res.send({ msg: "can't post", error: err.message });
  }
});
postRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const post = await PostModel.find({ _id: id });
  let user_id = post.userID;
  let user_req = req.body.userID;
  try {
    if (user_id != user_req) {
      res.send({ msg: "Not an authorized user" });
    } else {
      await PostModel.findByIdAndUpdate({ _id: id }, payload);
      res.send({ msg: "post upated" });
    }
  } catch (err) {
    res.send({ error: err.message });
  }
});
postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const post = await PostModel.find({ _id: id });
  let user_id = post.userID;
  let user_req = req.body.userID;
  try {
    if (user_id != user_req) {
      res.send({ msg: "Not an authorized user" });
    } else {
      await PostModel.findByIdAndDelete({ _id: id });
      res.send({ msg: "post deleted" });
    }
  } catch (err) {
    res.send({ error: err.message });
  }
});
postRouter.post("/top", async (req, res) => {});
module.exports = { postRouter };
