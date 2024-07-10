import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;

const searchRecipes = async (searchTerm, page) => {
  if (!apiKey) {
    throw new error("API Key not found");
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
  const queryParams = {
    apiKey: apiKey,
    query: searchTerm,
    number: "10",
    offset: (page * 10).toString(),
  };

  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url);
    const resultsJSON = await searchResponse.json();
    return resultsJSON;
  } catch (error) {
    console.log(error);
  }
};

const getRecipeSummary = async (recipeId) => {
  if (!apiKey) {
    throw new Error("Api key required");
  }
  const url = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/summary`
  );
  const queryParams = {
    apiKey: apiKey,
  };
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getFavouriteRecipesByIds = async (recipeIds) => {
  if (!apiKey) {
    throw new Error("Api key required");
  }
  const url = new URL(`https://api.spoonacular.com/recipes/informationBulk`);
  const queryParams = {
    apiKey: apiKey,
    ids: recipeIds.join(","),
  };
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const response = await fetch(url);
    const result = await response.json();
    const reqRecipes = result.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
    }));
    return reqRecipes;
  } catch (error) {
    console.log(error);
  }
};

export { searchRecipes, getRecipeSummary, getFavouriteRecipesByIds };
