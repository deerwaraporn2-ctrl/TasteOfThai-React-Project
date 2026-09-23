import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

function RecipeCard({ recipe }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  
  const isFavorite = favorites.some(
    (favorite) => favorite.idMeal === recipe.idMeal
  );


  return (
    <Link to={`/recipe/${recipe.idMeal}`} className="recipe-card-link">
      <article className="recipe-card">
        <img
          className="recipe-card-image"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />

        <div className="recipe-card-content">
          <h2>{recipe.strMeal}</h2>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleFavorite(recipe);
          }}
          className="favorite-button"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </article>
    </Link>
  );
}
export default RecipeCard;
