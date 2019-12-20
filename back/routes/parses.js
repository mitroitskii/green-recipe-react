const express = require('express');

const router = express.Router();
const { parseSearchPageVV } = require('../parsers/vkysvill');

module.exports = router;

router
  .route('/')
  // получить все ингредиенты POST
  .post(async (req, res) => {
    console.log('Received Post one Parse request');
    try {
      const { productname } = req.body;
      const ingredients = await parseSearchPageVV(productname);
        console.log(`Парсинг продукта ${productname}`, ingredients);
      if (ingredients.length !== 0) {
        res.send(JSON.stringify({ message: 'ok', ingredients }));
      } else {
        res.status(204).json([]);
      }
      //  res.send(JSON.stringify({ message: 'ok', ingredients }));
    } catch (error) {
      // res.send(JSON.stringify({ message: 'error', error }));
      res.status(400).json(error);
    }
  });
