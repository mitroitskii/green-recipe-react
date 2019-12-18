const express = require('express');

const router = express.Router();
const Recipe = require('../models/recipe');

module.exports = router;

// REST

// api/recipes
router
  .route('/')
  // получить все рецепты GET
  .get(async (req, res) => {
    console.log('Received Get all request');
    try {
      const recipes = await Recipe.find();
      return res.send(JSON.stringify({ message: 'ok', recipes }));
    } catch (error) {
      return res.send(JSON.stringify({ message: 'error', error }));

    }
  })
  // создать один новый рецепт POST
  .post(async (req, res) => {
    console.log('Received Post one request');
    //   console.log('req.body', req.body);
    const newRecipe = new Recipe(req.body);
    try {
      await newRecipe.save();
      return res.send(
        JSON.stringify({ message: 'ok', recipeId: newRecipe.id }),
      );
    } catch (error) {
      return res.send(JSON.stringify({ message: 'error', error }));
    }
  });


//  возвращает отсортированные по стоимости рецепты 
router.get('/price', async (req, res) => {
  let sortFlag = 1;
  if (req.query.direction !== 'up') {
    sortFlag = -1;
  }
  try {
    const recipes = await Recipe.find().sort({ priceTotal: sortFlag });
    return res.send(JSON.stringify({ message: 'ok', recipes }));
  } catch (error) {
    return res.send(JSON.stringify({ message: 'error', error }));
  }
});

// возвращает отсортированные по каллориям рецепты
router.get('/calorific', async (req, res) => {
  let sortFlag = 1;
  if (req.query.direction !== 'up') {
    sortFlag = -1;
  }
  try {
    const recipes = await Recipe.find().sort({ caloriesTotal: sortFlag });
    return res.send(JSON.stringify({ message: 'ok', recipes }));
  } catch (error) {
    return res.send(JSON.stringify({ message: 'error', error }));
  }
});

// возвращает один случайный рецепт
router.get('/random', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    const randIndex = Math.floor(Math.random() * (recipes.length))
    return res.send(JSON.stringify({ message: 'ok', id: recipes[randIndex]._id }));
  } catch (error) {
    return res.send(JSON.stringify({ message: 'error', error }));
  }
});

// api/recipes/:id
router
  .route('/:id')
  // получить конкретный рецепт GET
  .get(async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      return res.send(JSON.stringify({ message: 'ok', recipe }));
    } catch (error) {
      return res.send(JSON.stringify({ message: 'error', error }));
    }
  })
  // удалить конкретный рецепт DELETE
  .delete(async (req, res) => {
    try {
      const deleteResult = await Recipe.deleteOne({ _id: req.params.id });
      console.log('Delete', deleteResult);
      return res.send(JSON.stringify({ message: 'ok' }));
    } catch (error) {
      return res.send(JSON.stringify({ message: 'error', error }));
    }
  })
  // изменить конкретный рецепт PUT
  .put(async (req, res) => {
    try {
      const {
        name,
        image,
        instructions,
        priceTotal,
        caloriesTotal,
        ingredients,
      } = req.body;
      await Recipe.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name,
            image,
            instructions,
            priceTotal,
            caloriesTotal,
            ingredients,
          },
        },
      );
      return res.send(JSON.stringify({ message: 'ok' }));
    } catch (error) {
      return res.send(JSON.stringify({ message: 'error', error }));
    }
  });
