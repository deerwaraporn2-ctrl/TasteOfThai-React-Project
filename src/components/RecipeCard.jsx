import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import heroImage from "../assets/hero-thai.webp";

function RecipeCard({ recipe, isPersonal = false }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const recipeId = isPersonal ? recipe.id : recipe.idMeal;
  const recipeName = isPersonal ? recipe.name : recipe.strMeal;
  const recipeImage = isPersonal
    ? recipe.image || heroImage
    : recipe.strMealThumb;

  const isFavorite =
    !isPersonal &&
    favorites.some((favorite) => favorite.idMeal === recipe.idMeal);

  return (
    <Link to={`/recipe/${recipeId}`} className="recipe-card-link">
      <article className="recipe-card">
        <img className="recipe-card-image" src={recipeImage} alt={recipeName} />

        <div className="recipe-card-content">
          <h2>{recipeName}</h2>
        </div>

        {!isPersonal && (
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
        )}
      </article>
    </Link>
  );
}

export default RecipeCard;
