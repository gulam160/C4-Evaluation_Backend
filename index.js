const express = require("express");
const { auth } = require("./middlewares/auth");
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const { postRouter } = require("./routes/postRoutes");
const cors = require("cors");

const app = express();

// Middleware and Customs
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/posts", auth);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to mongoDB");
  } catch (err) {
    console.log(err.message);
  }
  console.log("server running at", process.env.port);
});
