const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Order = require("../models/orders");
const SingleOrder = require("../models/singleOrder");


//OK
exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json(JSON.stringify({
          message: "Mail exists"
        }));
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json(JSON.stringify({
              error: err
            }));
          } else {
            var usId = new mongoose.Types.ObjectId()
            const user = new User({
              _id: usId,
              email: req.body.email,
              password: hash,
              name: req.body.name,
              surname: req.body.surname
            });
            user
              .save()
              .then(result => {
                res.status(201).json(JSON.stringify({
                  message: "User created"
                }));
              })
              .catch(err => {
                console.log("ERROR:\n" + err);
                res.status(500).json(JSON.stringify({
                  error: err
                }));
              });

              const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                userId: usId,
                SingleOrder: [],
                totalPrice: 0
              });
              order
              .save()
              .catch(err =>{
                console.log("ERROR:\n" + err);
                res.status(500).json(JSON.stringify({
                  error: err
                }));
              })
          }
        });
      }
    });
};


//OK
exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json(JSON.stringify({
          message: "Auth failed"
        }));
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json(JSON.stringify({
            message: "Auth failed"
          }));
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "12h"
            }
          );
          return res.status(200).json(JSON.stringify({
            message: "Auth successful",
            userId: user[0]._id,
            userName: user[0].name,
            userSurname: user[0].surname,
            token: token
          }));
        }
        res.status(401).json(JSON.stringify({
          message: "Auth failed"
        }));
      });
    })
    .catch(err => {
      console.log("ERROR:\n" + err);
      res.status(500).json(JSON.stringify({
        error: err
      }));
    });
};


//OK
exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json(JSON.stringify({
        message: "User deleted"
      }));
    })
    .catch(err => {
      console.log("ERROR:\n" + err);
      res.status(500).json(JSON.stringify({
        error: err
      }));
    });
};

