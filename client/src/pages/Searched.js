import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { Params, useParams } from "react-router-dom";

function Searched() {

    const [searchedRecipes, setSearchedRecipes] = useState();
    
    let params = useParams();

    useEffect(() => {
      const searchRecipe = () => {
        fetch("http://localhost:5000/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchString: params.search }), 
        })
        .then(response => response.json())
        .then(data => {
          setSearchedRecipes(data);
        })
        .catch(error => {
          console.error(error);
        });
      };
    
      searchRecipe();
    }, [params.search]);
    
      const handleClick = (x) => {};

    let recipes = null;
   if (searchedRecipes && searchedRecipes.recipes) {
      recipes = searchedRecipes.recipes.map((item) => <RecipeCard key={item.id} {...item} />);
   }

  return (
    <div>
        <div className="px-8 py-16 md:px-24">
      <div className="categories">
        <p className="mb-3 font-medium flex items-center justify-center text-sm">
          Categories you might like to search
        </p>
        <ul className="flex gap-2 mb-16 items-center justify-center flex-wrap">
          <li>
            <a
              className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit"
              onClick={() => handleClick("mexican")}
            >
              Mexican
            </a>
          </li>
          <li>
            <a
              className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit"
              onClick={() => handleClick("dessert")}
            >
              Dessert
            </a>
          </li>
          <li>
            <a
              className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit"
              onClick={() => handleClick("indian")}
            >
              Indian Cuisine
            </a>
          </li>
          <li>
            <a
              className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit"
              onClick={() => handleClick("german")}
            >
              German
            </a>
          </li>
          <li>
            <a
              className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit"
              onClick={() => handleClick("spicy")}
            >
              Spicy
            </a>
          </li>
        </ul>
      </div>
      <div className="grid gap-y-10 justify-items-center lg:justify-items-start gap-x-20 grid-auto-fit">
        {recipes}
      </div>
      <div className="flex justify-center items-center mt-14">
        <button className="btn btn-outline px-24">See More</button>
      </div>
    </div>
    </div>
  )
}

export default Searched