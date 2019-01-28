const Items = require("../models/itemSchema");
const savedata = require("./savedata");

module.exports = (req, res) => {
  savedata()
    .then(() => {
      Items.find({})
        .limit(10)
        .then(data => {
          res.send({ success: true, message: "data", data });
        })
        .catch(err => {
          res.send({ success: flase, message: "No Data" });
        });
    })
    .catch(err => {
      console.log(err);
      res.send("err in savedata");
    });
};
