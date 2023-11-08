import React, { useState, useEffect } from "react";

const Tooltip = ({ name, image, description }) => {
   const [recipeName, setRecipeName] = useState("Loading");
   const [recipeImage, setRecipeImage] = useState("Loading");
   const [recipeDescription, setRecipeDescription] = useState("Loading");

   function removeFirstSixCharacters(inputString) {
      if (inputString.length > 6) {
         return inputString.substring(6);
      } else {
         return "Input string is too short";
      }
   }

   useEffect(() => {
      setRecipeName(name);
      if (image === "Image not found for the specified ingredient.") {
         setRecipeImage("https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg");
      } else {
         const outputImage = removeFirstSixCharacters(image);
         setRecipeImage(outputImage);
      }
      setRecipeDescription(description);
   }, [name, image, description]);

   return (
      <div className="overflow-hidden shadow-xl rounded-b-2xl">
         <div className="card card-compact w-64 bg-base-100">
            <figure>
               <img className="h-[200px] w-full object-cover object-center" src={recipeImage} alt="ingredient" />
            </figure>
            <div className="card-body break-words h-[200px] overflow-y-scroll">
               <h2 className="card-title capitalize">{recipeName}</h2>
               <p className="">{recipeDescription}</p>
               <div className="card-actions justify-end">
                  <button className="btn btn-success text-sm text-white">SHOP NOW</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Tooltip;
