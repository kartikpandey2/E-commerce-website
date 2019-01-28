const User = require("./models/userSchema.js");
const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const dbURL = process.env.MONGODB_URI || "mongodb://localhost/ecommerce";
const cors = require("cors");
const paypal = require("paypal-rest-sdk");
const path = require("path");
const saveItemsData = require("./handlers/savedata");
const dbConnection = require("./models/dbConnection");

const saltRounds = 10;
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(cors());

//paypal config

paypal.configure({
  mode: "sandbox",
  client_id:
    "AYbdPFUqxQDU65hpuyEAxEx2x6byR2jbKB9-49u4flaKyV9XTyhVq0YRm2SzqbjXyYYNEZsjSwedOwD7",
  client_secret:
    "EA1VMVDODwDBkH5lv3ZUmtXLtQtzvdGQ4RSQeSh03p6aDw5b6yOUiquk7WoEzePHHtonlgdfF7bQ9Shz"
});

//routes

const routes = require("./routes/routes.js");
routes(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Add items data into database
saveItemsData();

//server listening
app.listen(port, function() {
  console.log(`Server is running at port:${port}`);
});
