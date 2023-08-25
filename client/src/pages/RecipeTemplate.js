import React, { useEffect, useState } from "react";
import NutritionCircle from "../components/NutritionCircle";
import { useParams } from "react-router-dom";
import ApiKey from "../ApiKey";

function RecipleTemplate() {
   const [data, setData] = useState([]);
   let params = useParams();
   let token = localStorage.getItem("token");

   const saveRecipe = async (e) => {
      e.preventDefault();
      if (token) {
         fetch("http://localhost:5000/saverecipe", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               token: localStorage.getItem("token"),
               recipeId: params.name,
            }),
         })
            .then((res) => res.json())
            .then((data) => {
               console.log(data);
               alert(data.message);
            });
      } else {
         alert("Please Login First");
      }
   };

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
   const thingsElements = thingsArray.map((thing) => <NutritionCircle key={thing.name} name={thing.name} value={thing.value} />);
   return (
      <div>
         <div className="small-container">
            <div className="row">
               <div className="col-2">
                  <h1 className="recipe-title">{data.title}</h1>
                  <a href={data.sourceUrl}>{data.sourceName}</a>
                  <br></br>
                  <br></br>
                  <div className="rating">
                     <i className="fa fa-star"></i>
                     <i className="fa fa-star"></i>
                     <i className="fa fa-star"></i>
                     <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                     <i className="fa-light fa-up"></i>
                     <p>&nbsp;(7)</p>
                  </div>

                  <br></br>
                  <br></br>

                  <button className="btn" onClick={saveRecipe}>
                     <i className="fa-sharp fa-regular fa-bookmark"></i>&nbsp;Save Recipe
                  </button>

                  <br></br>
                  <br></br>
                  <p className="recipe-info">
                     {data && data.extendedIngredients ? data.extendedIngredients.length : <p>Loading...</p>} ingredients | {data.servings}{" "}
                     servings | {data.readyInMinutes} minutes
                  </p>
               </div>

               <div className="col-2">
                  <img src={data.image} width="100%" id="productImg" alt="" />
               </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <br></br>

            <div>
               <h1 className="recipe-detail-title">Description</h1>

               <p className="description-p" dangerouslySetInnerHTML={{ __html: data.summary }}></p>
            </div>

            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <br></br>

            <div>
               <h1 className="recipe-detail-title">Ingredients</h1>

               <ul className="ingredients-ul">
                  {data && data.extendedIngredients ? (
                     data.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>
                           <i className="fa-solid fa-arrow-right"></i>&nbsp;
                           {ingredient.original}
                        </li>
                     ))
                  ) : (
                     <li>Loading ingredients...</li>
                  )}
               </ul>
            </div>

            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <br></br>

            <div>
               <h1 className="recipe-detail-title">Instruction</h1>

               <p className="description-p" dangerouslySetInnerHTML={{ __html: data.instructions }}></p>
            </div>

            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <br></br>

            <div>
               <h1 className="recipe-detail-title">Nutritional Information</h1>
               <div className="nutrition-facts">{thingsElements}</div>
            </div>

            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <br></br>

            <div className="reviews-section">
               <div className="review-form-section">
                  <h3 className="review-title">Let us know how you like it :)</h3>
                  <div className="likedislike">
                     <i className="fa-solid fa-thumbs-up"></i>
                     <i className="fa-solid fa-thumbs-down"></i>
                  </div>

                  <h3 className="review-title">Rate this recipe and leave a review</h3>
                  <form>
                     <div className="form-group">
                        <div className="star-rating">
                           <input type="radio" id="5-star" name="rating" value="5"></input>
                           <label for="5-star" className="fas fa-star"></label>
                           <input type="radio" id="4-star" name="rating" value="4"></input>
                           <label for="4-star" className="fas fa-star"></label>
                           <input type="radio" id="3-star" name="rating" value="3"></input>
                           <label for="3-star" className="fas fa-star"></label>
                           <input type="radio" id="2-star" name="rating" value="2"></input>
                           <label for="2-star" className="fas fa-star"></label>
                           <input type="radio" id="1-star" name="rating" value="1"></input>
                           <label for="1-star" className="fas fa-star"></label>
                        </div>
                     </div>
                     <div className="form-group">
                        <textarea id="review" name="review" placeholder="Enter your review"></textarea>
                     </div>
                     <div className="form-group">
                        <button className="btn" type="submit">
                           Submit
                        </button>
                     </div>
                  </form>

                  <div className="reviews-section">
                     <div className="review">
                        <div className="review-header">
                           <div className="review-author">
                              <img src="../images/user-photo1.jpg" alt="User Avatar" className="avatar"></img>
                              <span className="author-name">John Doe</span>
                           </div>
                           <div className="user-rating">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-half-o"></i>
                           </div>
                        </div>
                        <p className="review-text">
                           I tried this recipe for dinner last night and it was a hit with the whole family! The flavors were amazing and
                           the instructions were easy to follow. Definitely recommend!
                        </p>
                     </div>

                     <div className="review">
                        <div className="review-header">
                           <div className="review-author">
                              <img src="images/user-photo2.jpg" alt="User Avatar" className="avatar"></img>
                              <span className="author-name">Jane Smith</span>
                           </div>
                           <div className="user-rating">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-o"></i>
                              <i className="fa fa-star-o"></i>
                              <i className="fa fa-star-o"></i>
                           </div>
                        </div>
                        <p className="review-text">
                           I was really excited to try this recipe, but it just didn't turn out well. The flavors were off and the cooking
                           times were way off. I probably won't make this again.
                        </p>
                     </div>

                     <div className="review">
                        <div className="review-header">
                           <div className="review-author">
                              <img src="../images/user-photo3.jpg" alt="User Avatar" className="avatar"></img>
                              <span className="author-name">Tom Jones</span>
                           </div>
                           <div className="user-rating">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-o"></i>
                           </div>
                        </div>
                        <p className="review-text">
                           I made this for a dinner party and everyone loved it! The flavors were complex and interesting, and it was a fun
                           dish to prepare. The only reason I'm giving it 4 stars instead of 5 is because it was a little time-consuming to
                           make.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
         </div>
      </div>
   );
}

export default RecipleTemplate;
