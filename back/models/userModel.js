const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  favouriteRecipes: Array,
});
module.exports = mongoose.model('User', userSchema);
