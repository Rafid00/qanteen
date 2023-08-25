import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
   const [recipeData, setRecipeData] = useState();
   const [recipes, setRecipes] = useState();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetch("http://localhost:5000/explore", {
         method: "POST",
      })
         .then((res) => res.json())
         .then((data) => {
            setLoading(false);
            setRecipeData(data);
         });
   }, []);

   const handleClick = (x) => {};

   useEffect(() => {
      setRecipes(recipeData?.recipe.map((item) => <RecipeCard key={item.id} {...item} />));
   }, [recipeData]);

   return (
      <div className="px-8 py-16 md:px-24">
         <div className="categories">
            <p className="font-medium flex items-center justify-center mb-1">Explore arbitrarily chosen recipes</p>
            <div className="mb-16 font-medium text-sm flex items-center justify-center gap-2">
               |
               <button
                  className="p-1 hover:bg-slate-200 rounded-full transition-all"
                  onClick={() => {
                     window.location.reload();
                  }}
               >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22px" height="22px">
                     <path d="M 16 4 C 10.886719 4 6.617188 7.160156 4.875 11.625 L 6.71875 12.375 C 8.175781 8.640625 11.710938 6 16 6 C 19.242188 6 22.132813 7.589844 23.9375 10 L 20 10 L 20 12 L 27 12 L 27 5 L 25 5 L 25 8.09375 C 22.808594 5.582031 19.570313 4 16 4 Z M 25.28125 19.625 C 23.824219 23.359375 20.289063 26 16 26 C 12.722656 26 9.84375 24.386719 8.03125 22 L 12 22 L 12 20 L 5 20 L 5 27 L 7 27 L 7 23.90625 C 9.1875 26.386719 12.394531 28 16 28 C 21.113281 28 25.382813 24.839844 27.125 20.375 Z" />
                  </svg>
               </button>
               <p>Refresh to explore more</p>|
            </div>
         </div>
         {loading ? (
            <div className="flex justify-center items-center">Loading...</div>
         ) : (
            <div className="grid gap-y-10 justify-items-center lg:justify-items-start gap-x-20 grid-auto-fit">{recipes}</div>
         )}
      </div>
   );
};

export default Home;
