import React, { useState, useEffect } from "react";
import axios from "axios";
import cheerio from "cheerio";

const Tooltip = ({ ingredientName }) => {
   const [image, setImage] = useState("Loading");
   const [description, setDescription] = useState("Loading");
   const ClearIngredientName = "";

   function cleanIngredient(ingredient) {
      let cleanedIngredient = ingredient.replace(/\(.*?\)/g, ""); // Remove bracket closed substring
      cleanedIngredient = cleanedIngredient.replace(
         /\d+(\s*\/\s*\d+)?\s*(tablespoons?|cups?|teaspoons?|pounds?|ounces?|grams?|kilograms?|ml|l|g|kg|tbsp|tsp|oz|lb|c|pt|qt|gal|fl oz|can)\b/g,
         ""
      ); // Remove numbers and units
      if (cleanedIngredient.includes(",")) {
         cleanedIngredient = cleanedIngredient.split(",")[0]; // Remove words after comma
      }
      return cleanedIngredient.trim();
   }

   const getIngredientImage = async (ingredient) => {
      try {
         const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(ingredient)}`;
         const response = await axios.get(url);
         const html = response.data;
         const $ = cheerio.load(html);
         const imageLink = $("table.infobox img").first().attr("src");
         if (imageLink) {
            setImage(imageLink);
         } else {
            setImage("images/buy-1.jpg");
         }
      } catch (error) {
         setImage("images/buy-1.jpg");
      }
   };

   const getRecipeDescription = async (recipe) => {
      try {
         const url = `https://en.wikipedia.org/w/api.php?action=parse&page=Pet_door&format=json`;
         const response = await axios.get(url, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          });
         console.log("axios", response)
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
            setDescription(description);
         } else {
            setDescription("Description not found for the specified recipe.");
         }
      } catch (error) {
         console.log("axios error")
         setDescription("Description not found for the specified recipe.");
      }
   };

   useEffect(() => {
      const ClearIngredientName = cleanIngredient(ingredientName);
      getIngredientImage(ClearIngredientName);
      getRecipeDescription(ClearIngredientName);
   }, [ingredientName]);

   return (
      <div>
         <div className="card card-compact w-64 bg-base-100 shadow-xl">
            <figure>
               <img src={image} alt="ingredient" />
            </figure>
            <div className="card-body">
               <h2 className="card-title">{ClearIngredientName}</h2>
               <p>{description}</p>
               <div className="card-actions justify-end">
                  <button className="btn btn-success text-sm text-white">SHOP NOW</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Tooltip;
