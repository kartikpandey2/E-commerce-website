const paypal = require("paypal-rest-sdk");
const itemSchema = require("../models/itemSchema");

module.exports = async (req, res) => {
  try {
    console.log(req.body);
    const item = await itemSchema.findOne({ _id: req.body._id });
    if (item == null) {
      return res.json({ success: false, msg: "Bad Request" });
    } else {
      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal"
        },
        redirect_urls: {
          return_url: "https://damp-anchorage-37687.herokuapp.com/success",
          cancel_url: "https://damp-anchorage-37687.herokuapp.com/cancel"
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: item.Name,
                  sku: "item",
                  price: item.price,
                  currency: "INR",
                  quantity: 1
                }
              ]
            },
            amount: {
              currency: "INR",
              total: item.price
            },
            description: "testing"
          }
        ]
      };

      paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
          console.log(error);
        } else {
          for (let i = 0; i < payment.links.length; ++i) {
            if (payment.links[i].rel === "approval_url") {
              res.header("Access-Control-Allow-Origin", "*");
              res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
              );
              res.json({ success: true, link: payment.links[i].href });
            }
          }
        }
      });
    }
  } catch (err) {
    res.json({ success: false, msg: "Something went Wrong" });
  }
};
