import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const PostManagement = () => {
   const [savedRecipes, setSavedRecipes] = useState();

   const [recipes, setRecipes] = useState();

   const token = localStorage.getItem("token");

   const activeTab = (e) => {
      const tabs = document.querySelectorAll(".tab");
      tabs.forEach((tab) => tab.classList.remove("tab-active"));
      e.target.classList.add("tab-active");
   };

   useEffect(() => {
      fetch("http://localhost:5000/postManagement", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            setSavedRecipes(data.saved);
         });
   }, []);

   useEffect(() => {
      setRecipes(savedRecipes?.map((item) => <RecipeCard key={item.id} {...item} />));
   }, [savedRecipes]);

   return (
      <div className="md:card bg-base-100 md:shadow-xl w-full">
         <div className="card-body">
            <div className="tabs justify-center items-center">
               <button className="tab tab-bordered tab-active" onClick={activeTab}>
                  Your Posts
               </button>
               <button className="tab tab-bordered" onClick={activeTab}>
                  Saved Recipes
               </button>
               <button className="tab tab-bordered" onClick={activeTab}>
                  Rated Recipes
               </button>
            </div>
            <div className="divider"></div>
            {/* <div className="w-full grid gap-y-10 justify-items-center gap-x-14 grid-auto-fit mt-8 mb-3">{recipes}</div> */}
            <div className="w-full flex flex-wrap justify-center items-center gap-10 mt-8 mb-3">{recipes}</div>
         </div>
      </div>
   );
};

export default PostManagement;
