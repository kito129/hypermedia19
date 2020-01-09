const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const SeminarsController = require('../controllers/seminars');

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

// Handle incoming requests to /seminar
router.get("/", SeminarsController.seminars_get_all);//

router.post("/", checkAuth, upload.single('photoGallery'), SeminarsController.seminars_create_seminar);//

router.get("/:seminarId", SeminarsController.seminars_get_seminar);//

router.delete("/:seminarId", checkAuth, SeminarsController.seminars_delete_seminar);//

module.exports = router;
