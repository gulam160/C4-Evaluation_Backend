require("dotenv").config();
const express = require("express");
const { connection } = require("./db");
const UserModel = require("./models/userModel");
const route = express.Router();

const app = express();

// Middlewares
app.use(express.json());
app.use(route);

app.listen(8001, () => {
  console.log("Server is running at port 8001");
});
