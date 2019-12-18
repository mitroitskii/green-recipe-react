const express = require('express');

const router = express.Router();
const { parseSearchPageVV } = require('../parsers/vkysvill');

module.exports = router;

// api/recipes
router
  .route('/')
  // получить все ингредиенты POST
  .post(async (req, res) => {
    console.log('Received Post one Parse request');
    try {
      const { productname } = req.body;
      const ingredients = await parseSearchPageVV(productname);
      //   console.log(`Парсинг продукта ${productname}`, ingredients);
      return res.send(JSON.stringify({ message: 'ok', ingredients }));
    } catch (error) {
      return res.send(JSON.stringify({ message: 'error', error }));
    }
  });
