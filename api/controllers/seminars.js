const mongoose = require("mongoose");

const Seminar = require("../models/seminar");
const Event = require("../models/event");

exports.seminars_get_all = (req, res, next) => {
  Seminar.find()
    .select("name relEvent date place _id")
    .populate("name", "relEvent","date","place",)
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        seminars: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            relEvent: doc.relEvent, 
            date: doc.date,
            place: doc.place,
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
  Seminar.findById(req.body.artistId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Seminar not found"
        });
      }
      const seminar = new Seminar({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        relEvent: req.body.relEvent, 
        date: req.body.date,
        place: req.body.place,
      });
      return seminar.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Seminar stored",
        createdSeminar: {
          _id: result._id,
          name: result.name,
          relEvent: result.relEvent, 
          date: result.date,
          place: result.place,
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
  Seminar.findById(req.params.seminarId)
    .populate("seminar")
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
  Seminar.remove({ _id: req.params.seminarId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Seminar deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/seminars",
          body: { seminarId: "ID", name: "Name" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
