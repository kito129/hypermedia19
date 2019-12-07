const mongoose = require("mongoose");

const Event = require("../models/event");
const Artist = require("../models/artist");

exports.seminars_get_all = (req, res, next) => {
  Event.find()
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        seminars: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/seminars/" + doc._id
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

exports.seminars_create_seminar = (req, res, next) => {
  Artist.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const seminar = new Event({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return seminar.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Seminar stored",
        createdSeminar: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/seminars/" + result._id
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

exports.seminars_get_seminar = (req, res, next) => {
  Event.findById(req.params.seminarId)
    .populate("product")
    .exec()
    .then(seminar => {
      if (!seminar) {
        return res.status(404).json({
          message: "Seminar not found"
        });
      }
      res.status(200).json({
        seminar: seminar,
        request: {
          type: "GET",
          url: "http://localhost:3000/seminars"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.seminars_delete_seminar = (req, res, next) => {
  Event.remove({ _id: req.params.seminarId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Seminar deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/seminars",
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
