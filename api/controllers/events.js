const mongoose = require("mongoose");

const Events = require("../models/event");
const Artist = require("../models/artist");

exports.events_get_all = (req, res, next) => {
  Events.find()
    .select("isSoldOut type price name artistId date place relSeminar abstract photoGallery _id")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        events: docs.map(doc => {
          return {
            _id: doc._id,
            artistId: doc.artistId,
            name: doc.name,
            date: doc.date,
            place: doc.place,
            price: doc.price,
            isSoldOut: doc.isSoldOut,
            type: doc.type,
            relSeminar: doc.relSeminar,
            abstract: doc.abstract,
            photoGallery: doc.photoGallery,
            request: {
              type: "GET",
              url: "http://localhost:3000/event/" + doc._id
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
  Events.find({ name: req.body.name })
  .exec()
  .then(eve => {
    if (eve.length >= 1) {
      return res.status(409).json({
        message: "Event already exists"
      });
    } else {
      Artist.findOne({_id: req.body.artistId})
      .exec()
      .then(artist => {
        
        if (!artist) {
          return res.status(404).json({
            message: "Artist not found"
          });
        }
        const event = new Events({
          _id: new mongoose.Types.ObjectId(),
          artistId:  req.body.artistId,
          name:  req.body.name,
          date:  req.body.date,
          place:  req.body.place,
          price:  req.body.price,
          isSoldOut:  req.body.isSoldOut,
          type:  req.body.type,
          relSeminar:  req.body.relSeminar,
          abstract:  req.body.abstract,
          photoGallery:  req.file.path
        });
        event
        .save()
        .then(result => {
          res.status(201).json({
            message: "Created Event successfully",
            createdArtist: {
              _id: result._id,
              artistId: result.artistId,
              name: result.name,
              date: result.date,
              place: result.place,
              price: result.price,
              isSoldOut: result.isSoldOut,
              type: result.type,
              relSeminar: result.relSeminar,
              abstract: result.abstract,
              photoGallery: result.photoGallery,
              request: {
                type: "GET",
                url: "http://localhost:3000/event/" + result._id
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
      });
    }
  })
};

exports.events_get_event = (req, res, next) => {
  const id = req.params.eventId;
  Events.findById(id)
    .select("isSoldOut type price name artistId date place relSeminar abstract photoGallery _id")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          event: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/event/"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "provided ID event NOT FOUND" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
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
          url: "http://localhost:3000/event",
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
