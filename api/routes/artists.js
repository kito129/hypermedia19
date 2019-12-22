const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const ArtistsController = require('../controllers/artists');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
      const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 25
  },
  fileFilter: fileFilter
});


// Handle incoming requests to /artist
router.get("/", ArtistsController.artists_get_all);

router.post("/", checkAuth, upload.array('photoGallery', 3), ArtistsController.artists_create_artist);

router.get("/:artistId", ArtistsController.artists_get_artist);

router.patch("/:artistId", checkAuth, ArtistsController.artists_update_artist);

router.delete("/:artistId", checkAuth, ArtistsController.artists_delete);

module.exports = router;
