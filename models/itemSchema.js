const mongoose = require("mongoose");
const Item = mongoose.Schema({
  Name: {
    type: String
  },
  Price: {
    type: String
  },
  ImageUrl: {
    type: String
  }
});

const Items = mongoose.model("Items", Item);

module.exports = Items;
