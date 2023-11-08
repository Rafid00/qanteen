const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
   recipeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
   },
   ingredients: [
      {
         name: String,
         image: String,
         description: String,
      },
   ],
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
