import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { Params, useParams, useNavigate } from "react-router-dom";

function Searched() {
   const [searchedRecipes, setSearchedRecipes] = useState();

   let params = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      const searchRecipe = () => {
         fetch("http://localhost:5000/search", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ searchString: params.search }),
         })
            .then((response) => response.json())
            .then((data) => {
               setSearchedRecipes(data);
            })
            .catch((error) => {
               console.error(error);
            });
      };

      searchRecipe();
   }, [params.search]);

   const handleClick = (x) => {
      navigate("/search/" + x);
   };

   let recipes = null;
   if (searchedRecipes && searchedRecipes.recipes) {
      recipes = searchedRecipes.recipes.map((item) => <RecipeCard key={item.id} {...item} />);
   }

   return (
      <div>
         <div className="px-8 py-16 md:px-24">
            <div className="categories">
               <p className="mb-3 font-medium flex items-center justify-center text-sm">Categories you might like to search</p>
               <ul className="flex gap-2 mb-6 items-center justify-center flex-wrap">
                  <li>
                     <button
                        className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit"
                        onClick={() => handleClick("mexican")}
                     >
                        Mexican
                     </button>
                  </li>
                  <li>
                     <button
                        className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit"
                        onClick={() => handleClick("dessert")}
                     >
                        Dessert
                     </button>
                  </li>
                  <li>
                     <button
                        className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit"
                        onClick={() => handleClick("indian")}
                     >
                        Indian Cuisine
                     </button>
                  </li>
                  <li>
                     <button
                        className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit"
                        onClick={() => handleClick("german")}
                     >
                        German
                     </button>
                  </li>
                  <li>
                     <button
                        className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit"
                        onClick={() => handleClick("spicy")}
                     >
                        Spicy
                     </button>
                  </li>
               </ul>
            </div>
            {recipes != "" ? (
               <div>
                  <div className="w-full flex justify-center">
                     <p class="flex justify-center font-medium btn btn-outline btn-sm text-xs w-fit mb-16">
                        Search Result For "{params.search}"
                     </p>
                  </div>
                  <div className="grid gap-y-10 justify-items-center lg:justify-items-start gap-x-20 grid-auto-fit">{recipes}</div>
               </div>
            ) : (
               <div className="w-full flex justify-center">
                  <p class="flex justify-center font-medium btn btn-outline btn-sm text-xs mb-16">No Recipes Found For "{params.search}"</p>
               </div>
            )}
         </div>
      </div>
   );
}

export default Searched;
