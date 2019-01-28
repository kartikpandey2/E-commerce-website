const mongoose = require("mongoose");
const dbURL = process.env.MONGODB_URI || "mongodb://localhost/ecommerce";
mongoose.Promise = Promise;
mongoose.connect(dbURL, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to database");
  }
});
