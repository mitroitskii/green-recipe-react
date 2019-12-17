const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  image: String,
  instructions: Array,
  priceTotal: Number,
  caloriesTotal: Number,
  ingredients: Array,
  author: String,
  portions: Number,
});

// recipeSchema.statics.mostRecent = async function () {
//   return this.find()
//     .limit(10)
//     .exec();
// };

module.exports = mongoose.model('Recipe', recipeSchema);
