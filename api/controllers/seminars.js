const mongoose = require("mongoose");

const Seminar = require("../models/seminar");

exports.seminars_get_all = (req, res, next) => {
  Seminar.find()
    .select("name date place abstract photoGallery _id")
    .exec()
    .then(docs => {
      const response = {
        seminars: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            date: doc.date,
            place: doc.place,
            abatract: doc.abatract,
            photoGallery: doc.photoGallery,
            request: {
              type: "GET",
              url: "http://localhost:3000/seminar/" + doc._id
            }
          };
        })
      };
        if (docs.length >= 0) {
          res.status(200).json(JSON.stringify(response));
          } else {
              res.status(404).json(JSON.stringify({
                  message: 'No entries found'
              }));
        }
      })
    .catch(err => {
      res.status(500).json(JSON.stringify({
        error: err
      }));
    });
};

exports.seminars_create_seminar = (req, res, next) => {
  Seminar.find({ name: req.body.name })
    .exec()
    .then(sem => {
      if (sem.length >= 1) {
        return res.status(409).json(JSON.stringify({
          message: "Seminar already exist"
        }));
      } else{
        const seminar = new Seminar({
          _id: mongoose.Types.ObjectId(),
          name: req.body.name,
          date: req.body.date,
          place: req.body.place,
          abstract: req.body.abstract,
          photoGallery: req.file.path
        });
        seminar
          .save()
          .then(result => {
            res.status(201).json(JSON.stringify({
              message: "Created Seminar Created",
              createdSeminar: {
                _id: result._id,
                name: result.name,
                date: result.date,
                place: result.place,
                abstract: result.abstract,
                photoGallery: result.photoGallery,
                request: {
                  type: "GET",
                  url: "http://localhost:3000/seminar/" + result._id
                }
              }
            }));
          })
        .catch(err => {
          console.log("ERROR:\n" + err);
          res.status(500).json(JSON.stringify({
            error: err
          }));
        });
      }
  });
};

exports.seminars_get_seminar = (req, res, next) => {
  Seminar.findById(req.params.seminarId)
    .select("name date place abstarct photoGallery _id")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(JSON.stringify({
          seminar: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/seminar/"
          }
        }));
      } else {
        res
          .status(404)
          .json(JSON.stringify({ message: "provided ID seminar NOT FOUND" }));
      }
    })
    .catch(err => {
      res.status(500).json(JSON.stringify({
        error: err
      }));
    });
};

exports.seminars_delete_seminar = (req, res, next) => {
  Seminar.remove({ _id: req.params.seminarId })
    .exec()
    .then(result => {
      res.status(200).json(JSON.stringify({
        message: "Seminar deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/seminar",
          body: { seminarId: "ID", name: "Name" }
        }
      }));
    })
    .catch(err => {
      res.status(500).json(JSON.stringify({
        error: err
      }));
    });
};
