const ingredientInfoCollection = async () => {
   const recipes = await recipe_m.find();
   for (let i = 0; i < recipes.length; i++) {
      const ingredients = recipes[i].ingredients;
      const ingredientsToSave = [];
      for (let j = 0; j < ingredients.length; j++) {
         const ingredient = ingredients[j];
         const ingredientInfo = extract(ingredient);
         ingredientsToSave.push(ingredientInfo);
      }
      ingredient_m.insertMany({ recipeID: recipes[i], ingredients: ingredientsToSave });
   }
};