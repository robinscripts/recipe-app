import { useEffect, useRef, useState } from "react";
import {
  searchRecipes,
  getFavourites,
  addFavouriteRecipe,
  removeFavouriteRecipe,
} from "./api.js";
import Recipe from "./components/Recipe.jsx";
import RecipeModal from "./components/RecipeModal.jsx";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
const tabs = {
  search: "Search",
  favourites: "Favourites",
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("burger");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentTab, setCurrentTab] = useState(tabs.search);
  const [favouriteRecipes, setFavouriteRecipes] = useState();
  const pagenumber = useRef(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const favouriteRecipes = await getFavourites();
        setFavouriteRecipes(favouriteRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const recipes = await searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pagenumber.current = 1;
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewMoreClick = async () => {
    const nextpage = pagenumber.current + 1;
    try {
      const nextRecipes = await searchRecipes(searchTerm, nextpage);
      setRecipes([...recipes, ...nextRecipes.results]);
      pagenumber.current = nextpage;
    } catch (error) {
      console.log(error);
    }
  };

  const addFavoriteHandles = async (recipe) => {
    try {
      await addFavouriteRecipe(recipe.id);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (error) {}
  };

  const removeFavoriteHandler = async (recipe) => {
    try {
      await removeFavouriteRecipe(recipe.id);
      const updatedRecipes = favouriteRecipes.filter(
        (favRecipe) => favRecipe.id !== recipe.id
      );
      setFavouriteRecipes(updatedRecipes);
    } catch (error) {}
  };

  return (
    <>
      <div className="app-container">
        <div className="header">
          <img src="/images/bg2.jpg"></img>
          <div className="title">My Recipe App</div>
        </div>
        <div className="tabs">
          <h1
            className={currentTab === tabs.search ? "tab-active" : ""}
            onClick={() => setCurrentTab(tabs.search)}
          >
            Recipe Search
          </h1>
          <h1
            className={currentTab === tabs.favourites ? "tab-active" : ""}
            onClick={() => setCurrentTab(tabs.favourites)}
          >
            Favourites
          </h1>
        </div>
        {currentTab === tabs.search && (
          <>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Enter a Search Term..."
                onChange={handleInputChange}
                value={searchTerm}
                required
              />
              <button type="submit">
                  <SearchIcon sx={{width:50,height:50}}/>
              </button>
            </form>
            <div className="recipe-grid">
              {recipes.map((recipe) => {
                const isFavorite = favouriteRecipes.some(
                  (fav) => fav.id === recipe.id
                );
                return (
                  <Recipe
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => {
                      setSelectedRecipe(recipe.id);
                    }}
                    onFavoritesClick={
                      isFavorite ? removeFavoriteHandler : addFavoriteHandles
                    }
                    isFavorite={isFavorite}
                  />
                );
              })}
            </div>
            <button className="view-more-button" onClick={handleViewMoreClick}>
              View More
            </button>
          </>
        )}

        {selectedRecipe && (
          <RecipeModal
            recipeId={selectedRecipe}
            onClick={() => {
              setSelectedRecipe(null);
            }}
          />
        )}

        {currentTab === tabs.favourites && (
          <>
            <div className="recipe-grid">
              {favouriteRecipes.map((recipe) => (
                <Recipe
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe.id)}
                  onFavoritesClick={removeFavoriteHandler}
                  isFavorite={true}
                />
              ))}
            </div>
          </>
        )}

        {selectedRecipe && (
          <RecipeModal
            recipeId={selectedRecipe}
            onClick={() => {
              setSelectedRecipe(null);
            }}
          />
        )}
      </div>
    </>
  );
};

export default App;
