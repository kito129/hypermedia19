const mongoose = require("mongoose");

const Events = require("../models/event");
const Artist = require("../models/artist");

exports.events_get_all = (req, res, next) => {
  Events.find()
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        events: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/events/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.events_create_event = (req, res, next) => {
  Artist.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const event = new Events({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return event.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/events/" + result._id
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

exports.events_get_event = (req, res, next) => {
  Events.findById(req.params.eventId)
    .populate("product")
    .exec()
    .then(event => {
      if (!event) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        event: event,
        request: {
          type: "GET",
          url: "http://localhost:3000/events"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.events_delete_event = (req, res, next) => {
  Events.remove({ _id: req.params.eventId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/events",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
