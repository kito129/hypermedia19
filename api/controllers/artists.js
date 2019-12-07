const mongoose = require("mongoose");
const Product = require("../models/artist");

exports.artists_get_all = (req, res, next) => {
  Product.find()
    .select("name price _id artistImage")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        artists: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
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
  const artist = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    artistImage: req.file.path
  });
  artist
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created artist successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
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
  Product.findById(id)
    .select("name price _id artistImage")
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
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product updated",
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
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/artists",
          body: { name: "String", price: "Number" }
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
