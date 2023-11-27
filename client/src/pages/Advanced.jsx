import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Advanced = () => {
   const [includeIngredients, setIncludeIngredients] = useState([]);
   const [excludeIngredients, setExcludeIngredients] = useState([]);
   const [servings, setServings] = useState("");
   const [preparationTime, setPreparationTime] = useState("");
   const [diet, setDiet] = useState("");
   const [search, setSearch] = useState("");
   const navigate = useNavigate();

   const addIncludeIngredients = (e) => {
      e.preventDefault();
      const newInclude = document.getElementById("includeIngredients").value;
      if (newInclude === "") return;
      setIncludeIngredients([...includeIngredients, newInclude]);
      document.getElementById("includeIngredients").value = "";
   };

   const addExcludeIngredients = (e) => {
      e.preventDefault();
      const newExclude = document.getElementById("excludeIngredients").value;
      if (newExclude === "") return;
      setExcludeIngredients([...excludeIngredients, newExclude]);
      document.getElementById("excludeIngredients").value = "";
   };

   const removeIncludedIngredient = (e) => {
      e.preventDefault();
      const ingredient = e.target.innerText;
      const newIncludeIngredients = includeIngredients.filter((item) => item !== ingredient);
      setIncludeIngredients(newIncludeIngredients);
      e.target.remove();
   };

   const removeExcludedIngredient = (e) => {
      e.preventDefault();
      const ingredient = e.target.innerText;
      const newExcludeIngredients = excludeIngredients.filter((item) => item !== ingredient);
      setExcludeIngredients(newExcludeIngredients);
      e.target.remove();
   };

   const changeServings = (e) => {
      e.preventDefault();
      setServings(e.target.value);
   };

   const changePreparationTime = (e) => {
      e.preventDefault();
      setPreparationTime(e.target.value);
   };

   const changeDiet = (e) => {
      e.preventDefault();
      setDiet(e.target.value);
   };

   const submitHandler = async (e) => {
      e.preventDefault();
      try{
         const response = await fetch("http://localhost:5000/advancedSearch", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               includeIngredients,
               excludeIngredients,
               servings,
               preparationTime,
               diet,
               search,
            }),
         });
         const data = await response.json();
         navigate("/advancedSearch/", { state: { data } });
      }catch(err){
         console.log(err);
      }
   };

   return (
      <form onSubmit={submitHandler} className="pt-[40px] pb-[150px]">
         <div className="overflow-hidden">
            <div className="w-screen flex justify-center items-center px-10 md:py-0 flex-col min-h-[500px] transition-all">
               <div className="w-full max-w-3xl flex justify-center items-center flex-col gap-4">
                  <input
                     type="text"
                     placeholder="Advanced Search"
                     autoComplete="off"
                     className="input input-bordered w-full h-[60px] text-center max-w-3xl  text-xs md:text-sm lg:text-base"
                     onChange={(e) => setSearch(e.target.value)}
                     value={search}
                  />
                  <div className="flex flex-col md:flex-row justify-between w-full gap-5">
                     <div className="w-full">
                        <div className="input-group">
                           <input
                              type="text"
                              autoComplete="off"
                              placeholder="Include Ingredients"
                              className="input input-bordered w-full h-[60px] text-center  text-xs md:text-sm lg:text-base"
                              id="includeIngredients"
                           />
                           <button onClick={addIncludeIngredients} className="btn btn-square h-[60px]">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="42px" height="42px">
                                 <path fill="none" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" />
                                 <path fill="#D3AFF7" d="M21,14h6v20h-6V14z" />
                                 <path fill="#D3AFF7" d="M14,21h20v6H14V21z" />
                              </svg>
                           </button>
                        </div>
                     </div>
                     <div className="w-full">
                        <div className="input-group">
                           <input
                              type="text"
                              autoComplete="off"
                              placeholder="Exclude Ingredients"
                              className="input input-bordered h-[60px] text-center w-full  text-xs md:text-sm lg:text-base"
                              id="excludeIngredients"
                           />
                           <button onClick={addExcludeIngredients} className="btn btn-square h-[60px]">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="42px" height="42px">
                                 <path fill="none" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" />
                                 <path fill="#D3AFF7" d="M21,14h6v20h-6V14z" />
                                 <path fill="#D3AFF7" d="M14,21h20v6H14V21z" />
                              </svg>
                           </button>
                        </div>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-5 md:gap-y-0 md:grid-cols-3 w-full gap-x-5">
                     <select onChange={changeServings} className="select select-bordered h-[60px] w-full  text-xs md:text-sm lg:text-base">
                        <option disabled selected>
                           Serving Size
                        </option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                     </select>
                     <select
                        onChange={changePreparationTime}
                        className="select select-bordered h-[60px] w-full  text-xs md:text-sm lg:text-base"
                     >
                        <option disabled selected>
                           Preparation Time
                        </option>
                        <option value={10}>&lt;10 Minutes</option>
                        <option value={20}>&lt;20 Minutes</option>
                        <option value={30}>&lt;30 Minutes</option>
                        <option value={40}>&lt;40 Minutes</option>
                        <option value={50}>&lt;50 Minutes</option>
                        <option value={60}>&lt;60 Minutes</option>
                     </select>
                     <select
                        onChange={changeDiet}
                        className="select select-bordered h-[60px] w-full text-xs md:text-sm lg:text-base col-span-2 md:col-span-1"
                     >
                        <option disabled selected>
                           Diet
                        </option>
                        <option>Gluten Free</option>
                        <option>Ketogenic</option>
                        <option>Vegeterian</option>
                        <option>Paleo</option>
                        <option>Dairy Free</option>
                        <option>Vegan</option>
                     </select>
                  </div>
                  <div className="flex justify-between w-full gap-5">
                     <div className="w-full">
                        <button className="btn h-[60px] w-full  text-xs md:text-sm lg:text-base">Advanced Search</button>
                     </div>
                     <div className="w-full">
                        <button className="btn h-[60px] w-full  text-xs md:text-sm lg:text-base" disabled>
                           Search By Bucket List
                        </button>
                        <label className="label">
                           <span className="label-text-alt invisible">Bottom Left label</span>
                           <span className="label-text-alt text-zinc-500">If have specific quantity of ingredients</span>
                        </label>
                     </div>
                  </div>
               </div>
               <div className="max-w-3xl mt-4">
                  <div className="flex justify-center gap-x-3 w-full flex-wrap gap-y-3 mb-3">
                     {includeIngredients.map((ingredient, index) => (
                        <button
                           key={index}
                           onClick={removeIncludedIngredient}
                           className="btn btn-info h-[60px] w-fit px-5 text-xs md:text-sm lg:text-base text-white"
                        >
                           {ingredient}
                        </button>
                     ))}
                  </div>
                  <div className="flex justify-center gap-x-3 w-full flex-wrap gap-y-3">
                     {excludeIngredients.map((ingredient, index) => (
                        <button
                           key={index}
                           onClick={removeExcludedIngredient}
                           className="btn btn-error h-[60px] w-fit px-5 text-xs md:text-sm lg:text-base text-white"
                        >
                           {ingredient}
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </form>
   );
};

export default Advanced;
