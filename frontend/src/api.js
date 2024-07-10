const searchRecipes = async (searchTerm, page) => {
  const baseURL = new URL("http://localhost:3000/api/recipes/searches");
  baseURL.searchParams.append("searchTerm", searchTerm);
  baseURL.searchParams.append("page", page);

  const response = await fetch(baseURL);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

const getRecipeSummary = async (recipeId) => {
  const baseURL = new URL(`http://localhost:3000/api/recipes/${recipeId}/summary`);

  const response = await fetch(baseURL);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

const getFavourites = async () => {
  const baseURL = new URL(`http://localhost:3000/api/recipes/favourite`);

  const response = await fetch(baseURL);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const addFavouriteRecipe = async (recipeid) => {
  const baseURL = new URL(`http://localhost:3000/api/recipes/favourite`);
  const body = {
    recipeID:recipeid
  }
  const response = await fetch(baseURL,{
    method:"POST",
    headers:{
      "content-type":"application/JSON",
    },
    body:JSON.stringify(body)
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

const removeFavouriteRecipe = async (recipeid) => {
  const baseURL = new URL(`http://localhost:3000/api/recipes/favourite`);
  const body = {
    recipeID:recipeid
  }
  const response = await fetch(baseURL,{
    method:"DELETE",
    headers:{
      "content-type":"application/JSON",
    },
    body:JSON.stringify(body)
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export {searchRecipes, getRecipeSummary, getFavourites, addFavouriteRecipe, removeFavouriteRecipe};
