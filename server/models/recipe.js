const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const Schema = mongoose.Schema;

const recipeSchema = new mongoose.Schema({
   sourceUrl: String,
   sourceName: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      ref: "User",
      required: true,
   },
   title: String,
   dishTypes: [String],
   summary: String,
   extendedIngredients: [String],
   averageRating: Number,
   servings: Number,
   readyInMinutes: Number,
   instructions: String,
   nutritionalInformation: [
      {
         name: String,
         quantity: String,
      },
   ],
   ratingsComments: [
      {
         author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
         },
         ratingValue: Number,
         comment: String,
      },
   ],
   upvote: Number,
   downvote: Number,
   image: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
