const mongoose = require('mongoose');
const { ObjectId } = require("mongoose").Types;
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  _id: ObjectId,
  id: Number,
  title: String,
  source_name: String,
  summary: String,
  instructions: String,
  ingredients: String,
  image: String,
  dishTypes: String
  
});

module.exports = mongoose.model("recipepost", recipeSchema);
