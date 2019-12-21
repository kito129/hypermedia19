const mongoose = require("mongoose");

const Order = require("../models/orders");
const Event = require("../models/event");


//TODO
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
              url: "https://hypermedia19.herokuapp.com/order/" + doc._id
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
      console.log("ERROR:\n" + err);
      res.status(500).json({
        error: err
      });
    });
};


exports.orders_create_order = (req, res, next) => {
  const body = req.body;
  const bodyOrder = body.order;
  Order.find({ userId: body.userId })
  .exec()
  .then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "Order with this userId already exists. Update this order"
      });
    } else {
        Event.find({_id: req.body.order[0].eventId })
        .exec()
        .then(event =>{
          const singlePrice =  Number(event[0].price);
          const quant =  Number(bodyOrder[0].quantity);
          const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            userId: req.body.userId,
            order: 
            [
              {
                eventId: req.body.order[0].eventId,
                quantity: req.body.order[0].quantity,
                subTotal: singlePrice*quant
              }
            ],
            totalPrice: singlePrice*quant
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
                  requestCart: {
                    type: "GET",
                    url: "https://hypermedia19.herokuapp.com/order/" + result._id
                  }
                }
              });
            })
            .catch(err => {
              if(err.name="CastError"){
                console.log("Invalid eventId input:\n" + err);
                res.status(400).json({
                  message: "Invalid eventId input",
                  error: err
                });
              } else {
                console.log("ERROR:\n" + err);
                res.status(500).json({
                  error: err
                });
              }
            });
        })
        .catch(err => {
          if(err.name="CastError"){
            console.log("Invalid eventId input:\n" + err);
            res.status(400).json({
              message: "Invalid eventId input",
              error: err
            });
          } else {
            console.log("ERROR:\n" + err);
            res.status(500).json({
              error: err
            });
          }
        });
      }
    })   
    .catch(err => {
      if(err.name="CastError"){
        console.log("Invalid userId input:\n" + err);
        res.status(400).json({
          error: "Invalid userId input"
        });
      } else {
        console.log("ERROR:\n" + err);
        res.status(500).json({
          error: err
        });
      }
    });
   
  };

  //CHECK
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
            url: "https://hypermedia19.herokuapp.com/order/"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "provided ID order NOT FOUND" });
      }
    })
    .catch(err => {
      console.log("ERROR:\n" + err);
      res.status(500).json({ error: err });
    });
};


//TODO
//inserimento nuoi biglietti o modifca dal carrello
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
          url: "https://hypermedia19.herokuapp.com/order/" + id
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
        console.log("ERROR:\n" + err);
        res.status(500).json({
          error: err
        });
      }
    });
};


//OK
exports.orders_delete = (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "https://hypermedia19.herokuapp.com/order/",
          body: { userId: "Number",}
        }
      });
    })
    .catch(err => {
      console.log("ERROR:\n" + err);
      res.status(500).json({
        error: err
      });
    });
};

