const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const foundUser = await User.findOne({ Username: username });
    const passwordIsValid = bcrypt.compareSync(password, foundUser.Password);
    if (passwordIsValid) {
      const token = jwt.sign(
        {
          username,
          id: foundUser.id
        },
        "abcdefghi"
      );
      res.json({ success: true, msg: "Login success", token });
    } else {
      throw new Error("Invalid Password");
    }
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      msg: "Authentication failed. Wrong password."
    });
  }
};
