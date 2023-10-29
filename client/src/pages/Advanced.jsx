import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Advanced = () => {
   const [servingSize, setServingSize] = useState("");
   const [preparationTime, setPreparationtime] = useState("");
   const [includeIngredients, setIncludeIngredients] = useState([]);
   const [excludeIngredients, setExcludeIngredients] = useState([]);
   const [search, setSearch] = useState("");
   const navigate = useNavigate();

   const handleDropdownChange = (event) => {
      const selectedValue = event.target.value;
      setServingSize(selectedValue);
   };

   const addIncludeIngredients = () => {
      const newInclude = document.getElementById("includeIngredients").value;
      if (newInclude === "") return;
      setIncludeIngredients([...includeIngredients, newInclude]);
      document.getElementById("includeIngredients").value = "";
   };

   const submitHandler = (e) => {
      e.preventDefault();
      e.preventDefault();
      navigate("/searched/" + search);
   };

   return (
      <form onSubmit={submitHandler}>
         <div className="overflow-hidden">
            <div className="w-screen h-[750px] flex justify-center items-center px-10 py-[420px] md:py-0">
               <div className="mt-[-200px] w-full max-w-3xl flex justify-center items-center flex-col gap-4">
                  <input
                     type="text"
                     placeholder="Advanced Search"
                     className="input input-bordered w-full h-[60px] text-center max-w-3xl  text-xs md:text-sm lg:text-base"
                     onChange={(e) => setSearch(e.target.value)}
                     value={search}
                  />
                  <div className="flex flex-col md:flex-row justify-between w-full gap-5">
                     <div className="w-full">
                        <div className="input-group">
                           <input
                              type="text"
                              placeholder="Include Ingredients"
                              className="input input-bordered w-full h-[60px] text-center  text-xs md:text-sm lg:text-base"
                              id="includeIngredients"
                           />
                           <button className="btn btn-square h-[60px]">
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
                              placeholder="Exclude Ingredients"
                              className="input input-bordered h-[60px] text-center w-full  text-xs md:text-sm lg:text-base"
                              id="excludeIngredients"
                           />
                           <button className="btn btn-square h-[60px]">
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
                     <select className="select select-bordered h-[60px] w-full  text-xs md:text-sm lg:text-base">
                        <option disabled selected>
                           Serving Size
                        </option>
                        <option>1-2</option>
                        <option>3-4</option>
                        <option>5-6</option>
                        <option>7-9</option>
                     </select>
                     <select className="select select-bordered h-[60px] w-full  text-xs md:text-sm lg:text-base">
                        <option disabled selected>
                           Preparation Time
                        </option>
                        <option>&lt;10 Minutes</option>
                        <option>&lt;20 Minutes</option>
                        <option>&lt;30 Minutes</option>
                        <option>&lt;40 Minutes</option>
                        <option>&lt;50 Minutes</option>
                        <option>&lt;60 Minutes</option>
                     </select>
                     <select className="select select-bordered h-[60px] w-full text-xs md:text-sm lg:text-base col-span-2 md:col-span-1">
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
            </div>
         </div>
      </form>
   );
};

export default Advanced;
