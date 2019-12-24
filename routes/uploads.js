const express = require('express');

const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/recipe-images');
  },

  filename(req, file, cb) {
    cb(null, `${new Date().getTime()}${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  res.send(JSON.stringify({ path: req.file.filename }));
});

router.get('/:id', (req, res) => {
  const storageWay = `${__dirname.slice(
    0,
    __dirname.indexOf('routes'),
  )}uploads/recipe-images/`;
  res.sendFile(`${storageWay}${req.params.id}`);
});

module.exports = router;
