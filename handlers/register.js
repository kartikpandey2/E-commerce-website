const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    if (username && password && firstName && lastName) {
      const hashedPassword = bcrypt.hashSync(password, salt);
      console.log(username);
      const new_user = new User({
        FirstName: firstName,
        LastName: lastName,
        Username: username,
        Password: hashedPassword
      });
      const savedUser = await new_user.save();
      res.json({ success: true, msg: "Successful user registration" });
    } else {
      res.json({ success: false, msg: "enter all fields" });
    }
  } catch (err) {
    console.log(err);
    if (err.code == 11000) {
      res.json({ success: false, msg: "Username taken" });
    } else {
      res.json({ success: false, msg: "Something went Wrong" });
    }
  }
};
