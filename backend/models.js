// models.js

const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect("mongodb+srv://user409:khasi_rk8@409proj.znwu9.mongodb.net/?retryWrites=true&w=majority&appName=409proj", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const RecipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: String,
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
  },
  dietaryPreferences: [String],
  substitutions: [String],
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
