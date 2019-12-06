const mongoose = require("mongoose");

const event = require("../models/event");
const artist = require("../models/artist");

exports.Seminars_get_all = (req, res, next) => {
  seminar.find()
    .select("artist quantity _id")
    .populate("artist", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        events: docs.map(doc => {
          return {
            _id: doc._id,
            artist: doc.artist,
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

exports.Seminars_create_event = (req, res, next) => {
  artist.findById(req.body.artistId)
    .then(artist => {
      if (!artist) {
        return res.status(404).json({
          message: "artist not found"
        });
      }
      const event = new event({
        _id: mongoose.Types.ObjectId(),
        artist: req.body.artistId
      });
      return event.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "event stored",
        createdevent: {
          _id: result._id,
          artist: result.artist,
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

exports.Seminars_get_event = (req, res, next) => {
  seminar.findById(req.params.eventId)
    .populate("artist")
    .exec()
    .then(event => {
      if (!event) {
        return res.status(404).json({
          message: "event not found"
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

exports.Seminars_delete_event = (req, res, next) => {
  seminar.remove({ _id: req.params.eventId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "event deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/events",
          body: { artistId: "ID"}
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
