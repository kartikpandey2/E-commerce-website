const mongoose = require("mongoose");
const reg_schema = mongoose.Schema({
  FirstName: {
    type: String
  },
  LastName: {
    type: String
  },
  Username: {
    type: String,
    unique: true
  },
  Password: {
    type: String
  }
});

const User = mongoose.model("User", reg_schema);

module.exports = User;
