// //Controllers decide what happens when you get a request from a server
const User = require("../models/user");

//create user
const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createUser", e });
    });
};

//getUsers
const getUsers = (req, res) => {
  User.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getUsers", e });
    });
};
//getUserId

const getUserId = (req, res) => {
  const { userId } = req.params;

  User.find({ userId })
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getUserId" });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
};
