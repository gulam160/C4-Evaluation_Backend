const router = express.Router();
const UserModel = require("../models/userModel");

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const user = new UserModel(body);
    const token = user.generateAuthToken();
    const response = await users.save();
    res.send(response);
  } catch (e) {
    res.send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });
    const token = await user.generateAuthToken();
    res.cookie("token", token, {
      // maxAge: 300000,
      expires: new Date(Date.now() + 300000),
      httpOnly: true,
      // secure: true,
    });
    console.log(`jwt token is: ${token}`);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // res.send(user);
      res.redirect("/");
    } else {
      res.send("inVlid password!");
    }
  } catch (e) {
    // console.log(e);
    res.send("User details is invalid!");
  }
});

module.exports = router;
