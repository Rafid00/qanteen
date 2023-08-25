import ApiKey from "./ApiKey";

export const fetchRandomData = async () => {
    
    try {
        const data = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=c555e3605e21452d8360b04f5360711a&number=20`);
        const response = await data.json();
        return response;
    }
    catch(e) {
        console.log(e,'something went wrong')
        return e
    }
}

export const fetchRecipeData = async (id) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=c555e3605e21452d8360b04f5360711a`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error, 'Something went wrong');
      return null;
    }
  };
  
  export const fetchSearchData = async (name) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=c555e3605e21452d8360b04f5360711a&number=20&query=${name}`);
      const data = await response.json();
      console.log(data)
      
      if (data.results && data.results.length > 0) {
        const recipeIds = data.results.map((result) => result.id);
        const recipesData = await Promise.all(recipeIds.map((id) => fetchRecipeData(id)));
        return recipesData;
      } else {
        throw new Error('No search results');
      }
    } catch (error) {
      console.log(error, 'Something went wrong');
      throw new Error('An error occurred');
    }
  };
  





