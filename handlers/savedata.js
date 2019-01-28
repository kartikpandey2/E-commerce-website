const Items = require("../models/itemSchema");

module.exports = async () => {
  const items = await Items.find({});
  if (!items.length) {
    return new Promise((resolve, reject) => {
      ItemDetail.map((item, index) => {
        let Item = Items();
        Item.Name = item.Name;
        Item.Price = item.price;
        Item.ImageUrl = item.src;

        Item.save()
          .then(() => {
            console.log("items save");
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
      resolve();
    });
  }
};

const ItemDetail = [
  {
    Name: "Pendrive",
    src: "pendrive.jpg",
    price: "₹10"
  },
  {
    Name: "IPhone",
    src: "iPhone.jpg",
    price: "₹20"
  },
  {
    Name: "Macbook Pro",
    src: "macbook-pro.jpg",
    price: "₹30"
  },
  {
    Name: " Macbook Air",
    src: "macbook-air.jpg",
    price: "₹40"
  },
  {
    Name: "Tv",
    src: "TV.jpg",
    price: "₹50"
  },
  {
    Name: "Washing Machine",
    src: "Washing-Machine.jpg",
    price: "₹60"
  },
  {
    Name: "Bean Bag",
    src: "bean-bag.jpg",
    price: "₹70"
  },
  {
    Name: " Water Purifier",
    src: "water-purifier-1.jpg",
    price: "₹80"
  },
  {
    Name: "Table",
    src: "table.jpg",
    price: "₹90"
  },
  {
    Name: "Bed",
    src: "Bed.jpg",
    price: "₹100"
  }
];
