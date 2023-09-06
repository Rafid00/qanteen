import React, { useEffect, useState } from "react";
import NutritionCircle from "../components/NutritionCircle";
import { useParams } from "react-router-dom";
import ApiKey from "../ApiKey";

const Recipe = () => {
   const [data, setData] = useState([]);
   let params = useParams();
   let token = localStorage.getItem("token");

   const fetchRecipeData = async () => {
      try {
         const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${ApiKey}`);
         const response = await data.json();
         return response;
      } catch (e) {
         console.log(e, "something went wrong");
         return e;
      }
   };

   useEffect(() => {
      fetchRecipeData().then((response) => {
         setData(response);
         console.log(data);
      });
   }, []);

   const [thingsArray, setThingsArray] = React.useState([
      { name: "Calorie", value: "80" },
      { name: "Carbohydrate", value: "250g" },
      { name: "Protein", value: "100g" },
      { name: "Potassium", value: "50g" },
   ]);

   const thingsElements = thingsArray.map((thing) => (
      <div className="stat place-items-center">
         <div className="stat-title">{thing.name}</div>
         <div className="stat-value">{thing.value}</div>
      </div>
   ));
   return (
      <div className="flex justify-center">
         <div className="py-16 w-[1100px]">
            <div className="flex justify-between flex-wrap">
               <div className="flex flex-col gap-2">
                  <div className="">
                     <p className="text-4xl font-bold mb-2 w-96">{data.title}</p>
                     <a className="opacity-50 font-medium" href={data.sourceUrl}>
                        {data.sourceName}
                     </a>
                  </div>
                  <div className="flex gap-3 items-center">
                     <div className="rating">
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                     </div>
                     <p className="text-xl text-orange-400 font-medium">[4]</p>
                  </div>

                  <button className="btn w-32 flex gap-1 mt-8">
                     <i className="fa-sharp fa-regular fa-bookmark"></i>
                     Save
                  </button>
                  <div className="text-lg mt-16">
                     <div className="flex">
                        <div className="text-center">
                           <p className="text-4xl">
                              {" "}
                              {data && data.extendedIngredients ? data.extendedIngredients.length : <p>Unknown</p>}
                           </p>
                           <p className="text-sm">ingredient</p>
                        </div>
                        <div class="divider divider-horizontal"></div>
                        <div className="text-center">
                           <p className="text-4xl">{data && data.servings ? data.servings : <p>Unknown</p>}</p>
                           <p className="text-sm">servings</p>
                        </div>
                        <div class="divider divider-horizontal"></div>
                        <div className="text-center">
                           <p className="text-4xl">{data && data.readyInMinutes ? data.readyInMinutes : <p>Unknown</p>}</p>
                           <p className="text-sm">minutes</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="">
                  <img className="rounded-lg" src={data.image} alt="" />
               </div>
            </div>
            <div class="divider divider-vertical py-10"></div>
            <div className="description flex flex-col justify-center">
               <p className="w-full text-2xl mb-2 font-medium">Description</p>
               {data && data.summary ? (
                  <p className="font-sans" dangerouslySetInnerHTML={{ __html: data.summary }}></p>
               ) : (
                  <p>Loading description</p>
               )}
            </div>
            <div class="divider divider-vertical py-10"></div>
            <div className="flex justify-between">
               <div className="flex flex-col justify-center">
                  <p className="w-full text-2xl mb-2 font-medium">Ingredients</p>
                  <ul className="flex flex-col gap-2">
                     {data && data.extendedIngredients ? (
                        data.extendedIngredients.map((ingredient) => (
                           <li className="flex items-center" key={ingredient.id}>
                              <img className="w-5 h-5 mr-2" src="/images/question.png" alt="" />
                              <p> {ingredient.original}</p>
                           </li>
                        ))
                     ) : (
                        <li>Loading ingredients</li>
                     )}
                  </ul>
               </div>
               <div className="">
                  <p className="w-64 text-right text-sm opacity-50">
                     ** If you are unaware of any ingredient, hover on the question mark to know more about it.
                  </p>
               </div>
            </div>
            <div class="divider divider-vertical py-10"></div>
            <div className="description flex flex-col justify-center">
               <p className="w-full text-2xl mb-2 font-medium">Instructions</p>
               {data && data.summary ? (
                  <p className="font-sans" dangerouslySetInnerHTML={{ __html: data.instructions }}></p>
               ) : (
                  <p>Loading instructions</p>
               )}
            </div>
            <div class="divider divider-vertical py-10"></div>
            <div className="description flex flex-col justify-center">
               <p className="w-full text-2xl mb-2 font-medium">Nutrition</p>
               <div className="stats shadow">{thingsElements}</div>
            </div>
            <div class="divider divider-vertical py-10"></div>
            <div className="description flex flex-col justify-center">
               <p className="w-full text-2xl mb-2 font-medium">Feedback</p>
               <div className="flex flex-col justify-center items-center">
                  <img className="avatar inline-block" src="/images/user-photo1.jpg" alt="" />
                  <p className="inline-block">Rafid Ahmmad</p>
                  <p className="text-sm opacity-50 mt-2">Rate this recipe</p>
                  <div className="rating mb-5">
                     <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                     <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                     <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                     <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                     <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  </div>
                  <textarea className="textarea textarea-bordered w-full" placeholder="Comment"></textarea>
                  <div className="mt-5 flex justify-end w-full">
                     <button className="btn btn-success text-white w-fit">Submit</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Recipe;
