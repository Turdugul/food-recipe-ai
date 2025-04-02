const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],  // Array of ingredients (strings)
  instructions: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
