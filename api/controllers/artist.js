const mongoose = require("mongoose");
const artist = require("../models/artist");

exports.artists_get_all = (req, res, next) => {
  artist.find()
    .select("name birthday _id artistImage")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        artists: docs.map(doc => {
          return {
            name: doc.name,
            birthday: doc.birthday,
            artistImage: doc.artistImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/artists/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.artists_create_artist = (req, res, next) => {
  const artist = new artist({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    birthday: req.body.birthday,
    artistImage: req.file.path
  });
  artist
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created artist successfully",
        createdartist: {
          name: result.name,
          birthday: result.birthday,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/artists/" + result._id
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
};

exports.artists_get_artist = (req, res, next) => {
  const id = req.params.artistId;
  artist.findById(id)
    .select("name birthday _id artistImage")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          artist: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/artists"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.artists_update_artist = (req, res, next) => {
  const id = req.params.artistId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  artist.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "artist updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/artists/" + id
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

exports.artists_delete = (req, res, next) => {
  const id = req.params.artistId;
  artist.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "artist deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/artists",
          body: { name: "String", birthday: "Number" }
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
