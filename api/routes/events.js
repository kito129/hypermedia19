const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const EventsController = require('../controllers/events');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/assets/images');
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


// Handle incoming GET requests to /events
router.get("/", EventsController.events_get_all);

router.post("/", checkAuth, upload.array('photoGallery', 3), EventsController.events_create_event);

router.get("/:eventId", EventsController.events_get_event);

router.delete("/:eventId", checkAuth, EventsController.events_delete_event);

module.exports = router;
