import React from "react";
import RecipeCard from "./RecipeCard";

const PostManagement = () => {
   return (
      <div className="md:card bg-base-100 md:shadow-xl w-full">
         <div className="card-body">
            <div className="tabs justify-center items-center">
               <button className="tab tab-bordered tab-active">Your Posts</button>
               <button className="tab tab-bordered">Saved Recipes</button>
               <button className="tab tab-bordered">Liked Recipes</button>
            </div>
            <div className="grid gap-y-10 justify-items-center lg:justify-items-start gap-x-10 grid-auto-fit mt-8 mb-3">
           
            </div>
         </div>
      </div>
   );
};

export default PostManagement;
