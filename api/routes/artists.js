const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ArtistsController = require('../controllers/artists');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", ArtistsController.artists_get_all);

router.post("/", checkAuth, upload.single('artistImage'), ArtistsController.artists_create_artist);

router.get("/:artistId", ArtistsController.artists_get_artist);

router.patch("/:artistId", checkAuth, ArtistsController.artists_update_artist);

router.delete("/:artistId", checkAuth, ArtistsController.artists_delete);

module.exports = router;
