const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");


//OK
exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json(JSON.Stringify({
          message: "Mail exists"
        }));
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json(JSON.Stringify({
              error: err
            }));
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              surname: req.body.surname
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json(JSON.Stringify({
                  message: "User created"
                }));
              })
              .catch(err => {
                console.log("ERROR:\n" + err);
                res.status(500).json(JSON.Stringify({
                  error: err
                }));
              });
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
        return res.status(401).json(JSON.Stringify({
          message: "Auth failed"
        }));
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json(JSON.Stringify({
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
              expiresIn: "1h"
            }
          );
          return res.status(200).json(JSON.Stringify({
            message: "Auth successful",
            token: token
          }));
        }
        res.status(401).json(JSON.Stringify({
          message: "Auth failed"
        }));
      });
    })
    .catch(err => {
      console.log("ERROR:\n" + err);
      res.status(500).json(JSON.Stringify({
        error: err
      }));
    });
};


//OK
exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json(JSON.Stringify({
        message: "User deleted"
      }));
    })
    .catch(err => {
      console.log("ERROR:\n" + err);
      res.status(500).json(JSON.Stringify({
        error: err
      }));
    });
};


//CHECK
exports.user_getId = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json(JSON.Stringify({
           message: "provided mail NOT FOUND" 
        }));
      } else {
        console.log("Request for ID: "  + user.email);
        const response = {
          mail :user.map(doc => {
            return {
              userId: doc._id,
              name:  doc.name,
              surname: doc.surname,
              request: {
                type: "GET",
                url: "https://hypermedia19.herokuapp.com/user/"
              }
            };
          })
        }
        res.status(200).json(JSON.Stringify(response));    
      }
    });
};
