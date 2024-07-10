import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Icon } from "@mui/material";

const Recipe = ({ recipe, onClick, isFavorite, onFavoritesClick}) => {
  return (
    <>
      <div className="recipe-card" onClick={onClick}>
        <img src={recipe.image}></img>
        <div className="recipe-card-title">
          <span onClick={(event)=>{
            event.stopPropagation();
            onFavoritesClick(recipe);
          }}>

          <Icon sx={{ color: isFavorite ? 'red' : 'inherit' }}>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </Icon>
          </span>
          <h3>{recipe.title}</h3>
        </div>
      </div>
    </>
  );
};

export default Recipe;
