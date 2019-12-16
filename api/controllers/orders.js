const mongoose = require("mongoose");

const Order = require("../models/orders");
const Event = require("../models/event");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select("_id userId order totalPrice")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        orders: docs.map(doc => {
          return {
            userId: doc.userId,
            order: doc.order,
            totalPrice: doc.totalPrice,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/order/" + doc._id
            }
          };
        })
      };
        if (docs.length >= 0) {
          res.status(200).json(response);
          } else {
              res.status(404).json({
                  message: 'No entries found'
              });
        }
      })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.orders_create_order = (req, res, next) => {
  Order.find({ userId: req.body.userId })
    .exec()
    .then(art => {
      if (art.length >= 1) {
        return res.status(409).json({
          message: "Order with this userId already exists"
        });
      } else {
        const order = new Order({
          _id: new mongoose.Types.ObjectId(),
          userId: req.body.userId,
          order: req.body.order,
          totalPrice: req.body.totalPrice
        });
        order
          .save()
          .then(result => {
            res.status(201).json({
              message: "Created Order Created",
              createdOrder: {
                userId: result.userId,
                order: result.order,
                totalPrice: result.totalPrice,
                request: {
                  type: "GET",
                  url: "http://localhost:3000/order/" + result._id
                }
              }
            });
          })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      }
    });
  };

exports.orders_get_order = (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .select("_id userId order totalPrice")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          order: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/order/"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "provided ID order NOT FOUND" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.orders_update_order = (req, res, next) => {
  const id = req.params.orderId;
  const updateOps = {};
  for (const ops of req.body ) {
    updateOps[ops.propName] = ops.value;
  }
  var options = {new: true};
  Order.findOneAndUpdate({ _id: id }, { $set: updateOps },options,function (err, doc) {  
  })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Order updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/order/" + id
        }
      });
    })
    .catch(err => {
      if(err.name="CastError"){
        console.log("Order ID not found");
        res.status(404).json({
          error: "Order ID not found"
        });
      } else{
        console.log(err);
        res.status(500).json({
          error: err
        });
      }
    });
};

exports.orders_delete = (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/order/",
          body: { userId: "Number",}
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
