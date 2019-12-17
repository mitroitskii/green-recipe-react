const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  image: String,
  ingredients: [],
  instructions: [],
  portions: Number,
  priceTotal: Number,
  caloriesTotal: Number,
  author: {},
});

// recipeSchema.statics.mostRecent = async function () {
//   return this.find()
//     .limit(10)
//     .exec();
// };

module.exports = mongoose.model('Recipe', recipeSchema);
