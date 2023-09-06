import React, { useEffect, useState, useContext } from "react";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import NavContext from "./NavContext";

const RecipeCard = (props) => {
   let params = useParams();

   let dishT = "";

   if (props.dishTypes) {
      dishT = props.dishTypes?.split(",");
   }

   return (
      <div>
         {
            <Link to={"/recipe/" + props.id}>
               <div className="card max-w-xs bg-base-100 shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <figure className="w-[320px] object-cover">
                     <img src={props.image ? props.image : "images/buy-1.jpg"} alt={props.title} />
                  </figure>
                  <div className="card-body">
                     <h2 className="card-title capitalize text-base">
                        <div className="truncate w-30">{props.title}</div>
                        <div className="badge badge-success text-white">Original</div>
                     </h2>
                     <p className="text-xs overflow-hidden w-full -mt-2 text-zinc-500 truncate">
                        By <span className="font-medium">{props.source_name}</span>
                     </p>
                     <p className="text-sm h-16 mb-3 overflow-hidden w-full" dangerouslySetInnerHTML={{ __html: props.summary }}></p>
                     <div className="flex justify-between mb-3">
                        <div className="badge badge-lg badge-outline text-zinc-800 rounded-md h-10 text-center text-xs w-16 px-9 overflow-hidden break-words">
                           Rating 5/5
                        </div>
                        <div className="badge badge-lg badge-outline text-zinc-800 rounded-md h-10 text-center text-xs w-16 px-9 overflow-hidden break-words">
                           Upvotes {numeral(10000000).format("0a").toUpperCase()}
                        </div>
                        <div className="badge badge-lg badge-outline text-zinc-800 rounded-md h-10 text-center text-xs w-16 px-9 overflow-hidden break-words">
                           Downvotes {numeral(2000).format("0a").toUpperCase()}
                        </div>
                     </div>
                     <div className="card-actions justify-end lowercase">
                        <div className="badge badge-outline">{dishT.length > 0 ? dishT[0] : "no dish type"}</div>
                        <div className={`badge badge-outline ${dishT.length > 1 ? "inline-flex" : "hidden"}`}>
                           {dishT.length > 1 ? dishT[1] : ""}
                        </div>
                     </div>
                  </div>
               </div>
            </Link>
         }
      </div>
   );
};

export default RecipeCard;
