const mongoose = require("mongoose");

const Events = require("../models/event");
const Artist = require("../models/artist");

exports.events_get_all = (req, res, next) => {
  Events.find()
    .select("artist date place relSeminar abstract photoGallery _id")
    .populate("artist", "date", "place", "relSeminar", "abstract", "photoGallery")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        events: docs.map(doc => {
          return {
            _id: doc._id,
            artist: doc.artist,
            date: doc.date,
            place: doc.place,
            relSeminar: doc.relSeminar,
            abstract: doc.abstract,
            photoGallery: doc.photoGallery,
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
        artist: req.body.artist,
        date: req.body.date,
        place: req.body.place,
        relSeminar: req.body.relSeminar,
        abstract: req.body.abstract,
        photoGallery: req.body.photoGallery
      });
      return event.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Event saved",
        createdOrder: {
          _id: result._id,
          artist: result.artist,
          date: result.date,
          place: result.place,
          relSeminar: result.relSeminar,
          abstract: result.abstract,
          photoGallery: result.photoGallery
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
    .populate("artist")
    .exec()
    .then(event => {
      if (!event) {
        return res.status(404).json({
          message: "Events not found"
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
        message: "Event deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/events",
          body: { eventId: "ID", name: "Name" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
