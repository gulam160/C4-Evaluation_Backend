const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "social", (err, decoded) => {
      if (decoded) {
        req.body.userID = decoded.userID;
        next();
      } else {
        res.send({ msg: "Login first" });
      }
    });
  } else {
    res.send({ msg: "login" });
  }
};
module.exports = { auth };
