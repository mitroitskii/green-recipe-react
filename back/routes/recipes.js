const express = require('express');

const router = express.Router();
const Recipe = require('../models/recipe');

module.exports = router;

// REST

// api/users
// - routes для пользователей

// api/recipes
// - получить все рецепты GET
router.get('/', async (req, res, next) => {
  console.log('Received Get all request');

  try {
    const recipes = await Recipe.find();
    return res.send(JSON.stringify({ message: 'ok', recipes }));
  } catch (error) {
    return res.send(JSON.stringify({ message: 'error', error }));
  }
});

// - создать один новый рецепт CREATE ONE POST
router.post('/', async (req, res, next) => {
  console.log('Received Post one request');
//   console.log('req.body', req.body);
  const newRecipe = new Recipe(req.body);
  try {
    await newRecipe.save();
    return res.send(JSON.stringify({ message: 'ok', recipeId: newRecipe.id }));
  } catch (err) {
    return res.send(JSON.stringify({ message: 'error' }));
  }
});

// api/recipes/:id
// GET
// - получить конкретный рецепт
// PUT
// - изменить рецепт
// DELETE
// - удалить рецепт

// api/users/:id/recipes
// - все рецепты одного пользователя
