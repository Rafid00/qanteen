import React from "react";
import { useState } from "react";

const WriteRecipe = () => {
   const [ingredients, setIngredients] = useState([]);
   const [instructions, setInstructions] = useState([]);
   const addIngredient = () => {
      const newIngredient = document.getElementById("ingred-name").value;
      if (newIngredient === "") return;
      setIngredients([...ingredients, newIngredient]);
      document.getElementById("ingred-name").value = "";
   };

   const removeIngredient = (e) => {
      const newIngredients = ingredients.filter((ingredient) => ingredient !== e.target.innerHTML);
      setIngredients(newIngredients);
   };

   const addInstruction = () => {
      const newInstruction = document.getElementById("inst-name").value;
      if (newInstruction === "") return;
      setInstructions([...instructions, newInstruction]);
      document.getElementById("inst-name").value = "";
   };

   const removeInstruction = (e) => {
      const newInstructions = instructions.filter((instruction) => instruction !== e.target.innerHTML);
      setInstructions(newInstructions);
   };

   const allIngredients = ingredients.map((ingredient, index) => (
      <button onClick={removeIngredient} key={index} className="btn btn-outline w-full hover:bg-inherit hover:text-current overflow-y-auto">
         {ingredient}
      </button>
   ));

   const allInstructions = instructions.map((instruction, index) => (
      <button
         onClick={removeInstruction}
         key={index}
         className="btn btn-outline w-full hover:bg-inherit hover:text-current overflow-y-auto"
      >
         {instruction}
      </button>
   ));

   return (
      <div className="flex justify-center py-16">
         <div className="w-[90%] lg:w-[70%]">
            <p className="text-center text-2xl lg:text-3xl mb-1 font-medium">Post Recipe</p>
            <p className="text-center mb-16 opacity-70 text-sm">Write your creative recipe</p>
            <div className="flex px-0 py-10 md:p-10 flex-wrap lg:flex-nowrap w-full justify-between items-center transition-all duration-300 hover:scale-[1.015] shadow-xl rounded-3xl mb-5">
               <div className="w-full order-2 lg:order-1 text-center md:text-start flex justify-center pt-5 lg:pt-0">
                  <div className="w-[70%]">
                     <p className="text-xl mb-2 font-medium">How to write a recipe?</p>
                     <p className="text-sm">1. Write a title that summarizes the recipe</p>
                     <p className="text-sm">2. Write a description of the recipe</p>
                     <p className="text-sm">3. Add a photo of the recipe</p>
                     <p className="text-sm">4. Add ingredients</p>
                     <p className="text-sm">5. Add instructions</p>
                     <p className="mb-2 text-sm">6. Add nutrition</p>
                     <p className="text-sm">
                        Crafting a recipe begins with a catchy title that encapsulates the dish. Describe the recipe's highlights and
                        origins, accompanied by an enticing photo. List the ingredients with accurate measurements and provide clear,
                        concise instructions for cooking and serving. Consider adding a brief nutritional breakdown for health-conscious
                        readers.
                     </p>
                  </div>
               </div>
               <div className="w-full order-1 flex justify-center">
                  <img className="rounded-r-3xl" src="images/ScreenshotRecipe.png" alt="" />
               </div>
            </div>
            <div className="form-control mb-5 transition-all duration-300 hover:scale-[1.015]">
               <label className="input-group input-group-vertical">
                  <span className="flex justify-center py-2 font-medium">Title</span>
                  <input type="text" placeholder="Ex. Summer Garlic Mushrooms and Mostaccioli" className=" text-center input shadow-xl" />
               </label>
            </div>
            <div className="form-control mb-5 transition-all duration-300 hover:scale-[1.015]">
               <label className="input-group input-group-vertical">
                  <span className="flex justify-center py-2 font-medium">Description</span>
                  <textarea
                     type="text"
                     rows={4}
                     placeholder="Ex. Need a dairy free, lacto ovo vegetarian, and vegan main course? Summer Garlic Mushrooms and Mostaccioli could be an awesome recipe to try. This recipe makes 4 servings with 472 calories, 15g of protein, and 15g of fat each..."
                     className="text-center textarea shadow-xl"
                  />
               </label>
            </div>
            <div className="form-control w-full mb-5">
               <label className="label hidden">
                  <span className="label-text">Insert Recipe Image</span>
                  <span className="label-text-alt invisible">Alt label</span>
               </label>
               <input type="file" className="file-input w-full shadow-xl transition-all duration-300 hover:scale-[1.015]" />
               <label className="label">
                  <span className="label-text-alt invisible">Insert Recipe Image</span>
                  <span className="label-text-alt">Insert Recipe Image</span>
               </label>
            </div>
            <div className="flex gap-5 flex-wrap md:flex-nowrap  mb-5">
               <div className="w-full rounded-3xl shadow-xl h-fit  transition-all duration-300 hover:scale-[1.015]">
                  <div className="p-5 flex flex-col gap-3">
                     <div className="form-control">
                        <input
                           id="ingred-name"
                           type="text"
                           placeholder="Ex. 2 Lemons, sliced thinly"
                           className="text-center input input-bordered"
                        />
                     </div>
                     <button className="btn btn-warning w-full" onClick={addIngredient}>
                        + Add Ingredients
                     </button>
                     {allIngredients}
                  </div>
               </div>
               <div className="w-full rounded-3xl shadow-xl h-fit  transition-all duration-300 hover:scale-[1.015]">
                  <div className="p-5 flex flex-col gap-3">
                     <div className="form-control">
                        <input
                           id="inst-name"
                           type="text"
                           placeholder="Ex. 2 Lemons, sliced thinly"
                           className="text-center input input-bordered"
                        />
                     </div>
                     <button className="btn btn-warning w-full" onClick={addInstruction}>
                        + Add Instructions
                     </button>
                     {allInstructions}
                  </div>
               </div>
            </div>
            <div className="w-full rounded-3xl shadow-xl h-fit mb-10  transition-all duration-300 hover:scale-[1.015]">
               <div className="p-5 flex flex-col gap-3">
                  <p className="text-center text-xl mb-5 font-medium">Nutrition</p>
                  <div className="flex flex-wrap lg:flex-nowrap justify-center w-full gap-5  mb-5">
                     <div className="form-control w-full">
                        <label className="input-group input-group-vertical">
                           <span className="flex justify-center py-2 font-medium">Calorie</span>
                           <input type="text" placeholder="Ex. 80" className=" text-center input input-bordered" />
                        </label>
                     </div>
                     <div className="form-control w-full">
                        <label className="input-group input-group-vertical">
                           <span className="flex justify-center py-2 font-medium">Carbohydrate</span>
                           <input type="text" placeholder="Ex. 250g" className=" text-center input input-bordered" />
                        </label>
                     </div>
                     <div className="form-control w-full">
                        <label className="input-group input-group-vertical">
                           <span className="flex justify-center py-2 font-medium">Protein</span>
                           <input type="text" placeholder="Ex. 100g" className="text-center input input-bordered" />
                        </label>
                     </div>
                     <div className="form-control w-full">
                        <label className="input-group input-group-vertical">
                           <span className="flex justify-center py-2 font-medium">Potassium</span>
                           <input type="text" placeholder="Ex. 50g" className=" text-center input input-bordered" />
                        </label>
                     </div>
                  </div>
                  <button className="btn btn-secondary w-full">Generate Using AI</button>
               </div>
            </div>
            <div className="flex justify-center md:justify-end gap-3 flex-wrap md:flex-nowrap">
               <button className="btn btn-info text-white px-10">Draft Recipe</button>
               <button className="btn btn-success text-white px-10">Submit Recipe</button>
            </div>
         </div>
      </div>
   );
};

export default WriteRecipe;
