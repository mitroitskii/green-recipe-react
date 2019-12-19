const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  image: String,
  portions: String,
  hours: String,
  minutes: String,
  ingredients: Array,
  instructions: Array,
  category: String,
  priceTotal: String,
  caloriesTotal: String,
  author: String,
  authorName: { type: String, default: 'Аноним' },
  likes: Number,
  portionsSuffix: String,
});

// recipeSchema.statics.mostRecent = async function () {
//   return this.find()
//     .limit(10)
//     .exec();
// };

module.exports = mongoose.model('Recipe', recipeSchema);
