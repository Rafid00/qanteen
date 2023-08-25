import React, { useEffect, useState } from "react";
import SearchSuggestion from './SearchSuggestion';


const SearchSuggestionsList = ({ suggestions }) => {
  const [searchedRecipes, setSearchedRecipes] = useState();
    
    

    useEffect(() => {
      const searchRecipe = () => {
        fetch("http://localhost:5000/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchString: suggestions }), 
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
    }, [suggestions]);
    

    let recipes = null;
   if (searchedRecipes && searchedRecipes.recipes) {
      recipes = searchedRecipes.recipes.map((item) => <SearchSuggestion key={item.id} {...item} />);
   }
  return (
    <div className="search-suggestions-list">
      {recipes}
    </div>
  );
};

export default SearchSuggestionsList;