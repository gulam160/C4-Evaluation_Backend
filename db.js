const mongoose = require("mongoose");

const connection = mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("not connected", e);
  });

module.exports = { connection };
