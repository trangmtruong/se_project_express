const ClothingItem = require("../models/clothingItem");
//Controllers decide what happens when you get a request from a server

const createItem = (req, res) => {
  console.log(req);

  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createItem", e });
    });
};
module.exports = {
  createItem,
};
