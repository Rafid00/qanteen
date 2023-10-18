import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
   const [recipeData, setRecipeData] = useState();
   const [recipes, setRecipes] = useState();
   const [loading, setLoading] = useState(true);
   const isLoggedIn = localStorage.getItem("loggedIn");
   const token = localStorage.getItem("token");

   if (!isLoggedIn) window.location.replace("/explore");

   useEffect(() => {
      fetch("http://localhost:5000/recommendations", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            setLoading(false);
            setRecipeData(data.recipe);
         });
   }, []);

   useEffect(() => {
      setRecipes(recipeData?.map((item) => <RecipeCard key={item.id} {...item} />));
   }, [recipeData]);

   return (
      <div className="px-8 py-16 md:px-24">
         <div className="categories">
            <p className="mb-3 font-medium flex items-center justify-center text-sm">Categories you might like to search</p>
            <ul className="flex gap-2 mb-16 items-center justify-center flex-wrap">
               <li>
                  <a href="/searched/mexican" className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit">
                     Mexican
                  </a>
               </li>
               <li>
                  <a href="/searched/dessert" className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit">
                     Dessert
                  </a>
               </li>
               <li>
                  <a href="/searched/indian" className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit">
                     Indian Cuisine
                  </a>
               </li>
               <li>
                  <a href="/searched/german" className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit">
                     German
                  </a>
               </li>
               <li>
                  <a href="/searched/spicy" className="btn btn-outline btn-sm text-xs hover:bg-emerald-500 hover:border-inherit">
                     Spicy
                  </a>
               </li>
            </ul>
         </div>
         {loading ? (
            <div className="flex justify-center items-center">Loading...</div>
         ) : (
            <div className="grid gap-y-10 justify-items-center lg:justify-items-start gap-x-20 grid-auto-fit">{recipes}</div>
         )}
         <div className="flex justify-center items-center mt-14">
            <button className="btn btn-outline px-24">See More</button>
         </div>
      </div>
   );
};

export default Home;
