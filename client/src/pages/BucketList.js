import React from "react";
import IngredientsStack from "../components/IngredientsStack";

function Bucket() {
   const [thingsArray, setThingsArray] = React.useState(["Thing 1", "Thing 2"]);

   function addItem() {
      setThingsArray((prevState) => {
         return [...prevState, `Thing ${prevState.length + 1}`];
      });
   }
   const thingsElements = thingsArray.map((thing) => <IngredientsStack key={thing} name={thing} />);
   return (
      <div>
         <p className="bucketh1">Set the ingredients you have at home</p>
         <div className="Bucket">
            <input type="text" placeholder="Type the ingredient to add" class="input-bordered input w-full max-w-xs ingredient-input" />
            <button class="btn btn-outline btn-accent btn btn-wide" onClick={addItem}>
               Add Ingredient
            </button>
         </div>

         <div>{thingsElements}</div>
      </div>
   );
}

export default Bucket;
