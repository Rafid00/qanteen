import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Recipe = () => {
   const [data, setData] = useState([]);
   const [saved, setSaved] = useState(false);
   let params = useParams();
   let token = localStorage.getItem("token");

   const saveRecipe = async () => {
      const response = await fetch("http://localhost:5000/saveRecipe", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({ recipeId: params.id }),
      });

      const data = await response.json();
      setSaved(!saved);
      alert(data.message); // Handle the response from the server
   };

   useEffect(() => {
      window.scrollTo(0, 0);
      fetch("http://localhost:5000/recipeInfo", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ id: params.id }),
      })
         .then((res) => res.json())
         .then((data) => {
            setData(data.recipeInfo);
         });
      if (token) {
         fetch("http://localhost:5000/checkSaved", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ recipeId: params.id }),
         })
            .then((res) => res.json())
            .then((data) => {
               setSaved(data.saved);
            });
      }
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
      <div className="flex justify-center lg:px-24">
         <div className="py-16 w-full lg:w-[1100px]">
            <div className="flex justify-center lg:justify-between flex-wrap lg:flex-nowrap">
               <div className="flex flex-col gap-2 order-2 md:order-1 items-center lg:items-start">
                  <div className="text-center lg:text-start mt-7 lg:mt-0">
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

                  {token ? (
                     <button className="btn w-32 flex gap-1 mt-8" onClick={saveRecipe}>
                        {saved ? (
                           <div className="">
                              Saved
                           </div>
                        ) : (
                           <div className="">
                              <i className="fa-sharp fa-regular fa-bookmark"></i> Save
                           </div>
                        )}
                     </button>
                  ) : (
                     <button className="btn w-32 flex gap-1 mt-8" disabled>
                        <i className="fa-sharp fa-regular fa-bookmark"></i>
                        Save
                     </button>
                  )}

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
               <div className="order-1 lg:order-2">
                  <img className="rounded-lg" src={data.image} alt="" />
               </div>
            </div>
            <div class="divider divider-vertical py-10 px-7 lg:px-0"></div>
            <div className="description flex flex-col justify-center  px-7 lg:px-0 text-center lg:text-start">
               <p className="w-full text-2xl mb-2 font-medium">Description</p>
               {data && data.summary ? (
                  <p className="font-sans" dangerouslySetInnerHTML={{ __html: data.summary }}></p>
               ) : (
                  <p>Loading description</p>
               )}
            </div>
            <div class="divider divider-vertical py-10"></div>
            <div className="flex justify-center lg:justify-between  text-center lg:text-start flex-wrap lg:flex-nowrap px-7 lg:px-0">
               <div className="flex flex-col justify-center w-full lg:w-fit">
                  <p className="w-full text-2xl mb-2 font-medium">Ingredients</p>
                  <ul className="flex flex-col gap-2">
                     {data && data.extendedIngredients ? (
                        data.extendedIngredients.map((ingredient) => (
                           <li className="flex items-center justify-center lg:justify-start">
                              <img className="w-5 h-5 mr-2" src="/images/question.png" alt="" />
                              <p> {ingredient}</p>
                           </li>
                        ))
                     ) : (
                        <li>Loading ingredients</li>
                     )}
                  </ul>
               </div>
               <div className="">
                  <p className="w-64 lg:text-right text-sm opacity-50  text-center mt-7 lg:mt-0">
                     ** If you are unaware of any ingredient, hover on the question mark to know more about it.
                  </p>
               </div>
            </div>
            <div class="divider divider-vertical py-10"></div>
            <div className="description flex flex-col justify-center text-center lg:text-start px-7 lg:px-0">
               <p className="w-full text-2xl mb-2 font-medium">Instructions</p>
               {data && data.summary ? (
                  <p className="font-sans" dangerouslySetInnerHTML={{ __html: data.instructions }}></p>
               ) : (
                  <p>Loading instructions</p>
               )}
            </div>
            <div class="divider divider-vertical py-10"></div>
            <div className="description flex flex-col justify-center text-center lg:text-start px-7 lg:px-0">
               <p className="w-full text-2xl mb-2 font-medium">Nutrition</p>
               <div className="stats shadow">{thingsElements}</div>
            </div>
            <div class="divider divider-vertical py-10"></div>
            <div className="description flex flex-col justify-center text-center lg:text-start px-7 lg:px-0">
               <p className="w-full text-2xl mb-2 font-medium">Feedback</p>
               <div className="flex flex-col justify-center items-center">
                  <img className="avatar inline-block" src="/images/user-photo1.jpg" alt="" />
                  <p className="inline-block">Rafid Ahmmad</p>
                  <p className="text-sm opacity-50 mt-2">Rate this recipe</p>
                  <div className="rating mb-5">
                     <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                     <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
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
