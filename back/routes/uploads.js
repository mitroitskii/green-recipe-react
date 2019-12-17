const express = require('express');

const router = express.Router();
const multer = require('multer');

// const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploadsstorage');
  },

  filename(req, file, cb) {
    cb(null, `${new Date().getTime()}${file.originalname}`);
  },
});

const upload = multer({ storage });
// const upload = multer({ dest: 'uploadssimple/' });
// app.post('/api/upload/', (req, res, next) => {
// router
//   .route('/')
//   // получить все рецепты GET
//   .get(async (req, res) => {
//     console.log('Received Get all request');
//   })
//   // создать один новый рецепт POST
//   .post(async (req, res) => {
//     console.log('Received upload one request');
//     //   console.log('req.body', req.body);
//   });

router.post(
  '/',
  upload.single('file'),
  (req, res) => {
    //   console.log('Received file to upload request');

    //   const host = req.hostname;
    //   console.log('host', host);

    //   const filePath = `${req.protocol}://${host}/${req.file.path}`;
    //   console.log('filePath', filePath);
    //   const file = req.file;
    //   res.send(file);
    console.log('req', req.file),
    //   console.log(req.file.path);

    // res.send(JSON.stringify({ req }));
    res.send(JSON.stringify({ path: req.file.filename }));
  },

  //   res.redirect('http://localhost:3000/');
);

// router.post(
//   '/img',
//   (req, res) => {
//     console.log('Image requested '),
//     console.log('path', req.body.path),
//     // res.send(JSON.stringify({ message:'ok' }),
//     // res.send(JSON.stringify({ message: 'ok' }));
//     //   , res.sendfile();
//     res.sendFile(`./${req.body.path}`);
//   },
//   // img src = link to api
// );

router.get(
  '/:id',
  (req, res) => {
    // /home/denis/Documents/My_BootCamp_Projects/final_Project/green-recipe-react/back/uploadsstorage/1576590765939weatherpics.jpg
    const storageWay = `${__dirname.slice(
      0,
      __dirname.indexOf('routes'),
    )}uploadsstorage/`;
    res.sendFile(`${storageWay}${req.params.id}`);
  },
  // img src = link to api
);

module.exports = router;
