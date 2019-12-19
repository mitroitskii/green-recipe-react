const express = require('express');

const router = express.Router();
const multer = require('multer');

// const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/recipe-images');
  },

  filename(req, file, cb) {
    cb(null, `${new Date().getTime()}${file.originalname}`);
  },
});

const upload = multer({ storage });
// const upload = multer({ dest: 'uploadssimple/' });

router.post('/', upload.single('file'), (req, res) => {
    console.log('Received file to upload request');

  //   const host = req.hostname;
  //   console.log('host', host);

  //   const filePath = `${req.protocol}://${host}/${req.file.path}`;
  //   console.log('filePath', filePath);
  //   const file = req.file;
  //   res.send(file);
  // console.log('req.file', req.file),
  //   console.log(req.file.path);

  // res.send(JSON.stringify({ req }));
  res.send(JSON.stringify({ path: req.file.filename }));
});

router.get('/:id', (req, res) => {
  const storageWay = `${__dirname.slice(
    0,
    __dirname.indexOf('routes'),
  )}uploads/recipe-images/`;
  res.sendFile(`${storageWay}${req.params.id}`);
  // img src = link to api
});

module.exports = router;
