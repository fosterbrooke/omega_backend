const config = require("../configs/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Op;

exports.signup = (req, res) => {
  const { name, business, email, phone, password } = req.body;
  console.log(req.params);
  User.create({
    name,
    business,
    email,
    phone,
    password: bcrypt.hashSync(password, 8),
  })
    .then((user) => {
      res.send({ message: "User was registered successfully!", user });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      let token = jwt.sign({ id: user.id }, config.auth.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        message: "User logged in successfully",
        accessToken: token,
        user,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
