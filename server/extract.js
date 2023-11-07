const axios = require("axios");
const cheerio = require("cheerio");

function cleanIngredient(ingredient) {
   let cleanedIngredient = ingredient.replace(/\(.*?\)/g, ""); // Remove bracket closed substring
   cleanedIngredient = cleanedIngredient.replace(
      /[\d+-.]+\s*(\/\s*[\d+.]+)?\s*(tablespoons?|cups?|teaspoons?|pounds?|ounces?|grams?|kilograms?|ml|l|g|kg|tbsp|tsp|oz|lb|c|pt|qt|gal|fl oz|can)\b/g,
      ""
   ); // Remove numbers and units
   if (cleanedIngredient.includes(",")) {
      cleanedIngredient = cleanedIngredient.split(",")[0]; // Remove words after comma
   }
   cleanedIngredient = cleanedIngredient.replace(/[-+].*/g, ""); // Remove part after any sign
   cleanedIngredient = cleanedIngredient.replace(/\d+/g, ""); // Remove all remaining numbers
   cleanedIngredient = cleanedIngredient.replace(/\bof\b/g, ""); // Remove the word "of"
   cleanedIngredient = cleanedIngredient.trim().toLowerCase(); // Trim and lowercase
   const substrings = generateSubstrings(cleanedIngredient);
   return substrings;
}

function generateSubstrings(str) {
   const result = [];
   const words = str.split(" ");

   for (let i = 0; i < words.length; i++) {
      for (let j = i; j < words.length; j++) {
         const substring = words.slice(i, j + 1).join(" ");
         result.push(substring);
      }
   }

   return result.sort((a, b) => b.length - a.length);
}

const getIngredientImage = async (ingredient) => {
   try {
      const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(ingredient)}`;
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const imageLink = $("table.infobox img").first().attr("src");
      if (imageLink) {
         return "Image: " + `https:${imageLink}`;
      } else {
         return "Image not found for the specified ingredient.";
      }
   } catch (error) {
      return "Error: " + error.message;
   }
};

const getRecipeDescription = async (recipe) => {
   try {
      const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(recipe)}`;
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const paragraphs = $("p");
      let description = "";
      paragraphs.each((index, paragraph) => {
         if ($(paragraph).text().trim().length > 0) {
            description = $(paragraph).text().trim();
            return false;
         }
      });
      if (description) {
         return "Recipe description: " + description;
      } else {
         return "Description not found for the specified recipe.";
      }
   } catch (error) {
      return "Error: " + error.message;
   }
};

const extract = async (recipe) => {
   const mixedIngredientName = recipe;
   const ingredientName = cleanIngredient(mixedIngredientName);
   console.log(ingredientName);
   for (let i = 0; i < ingredientName.length; i++) {
      const recipeImage = await getIngredientImage(ingredientName[i]);
      if (recipeImage.includes("Error")) {
         console.log(image);
         continue;
      } else {
         const recipeDescription = await getRecipeDescription(ingredientName[i]);
         console.log(recipeImage);
         console.log(recipeDescription);
         const result = {
            ingredient: ingredientName[i],
            image: recipeImage,
            description: recipeDescription,
         };
         return result;
      }
   }

   return { ingredient: "Ingredient not found" };
};

extract("1 cup of chicken breast");
