import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeApi";

function RecipeDetailPage() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipe() {
      try {
        const data = await getRecipeById(id);

        if (!data) {
          setError("Could not find this recipe.");
          return;
        }
        
        setRecipe(data);
      } catch {
        setError("Could not load this recipe.");
      }
    }

    loadRecipe();
  }, [id]);

  if (error) {
    return (
      <div className="search-message">
        <div className="chef-hat">👨‍🍳</div>
        <p>{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }
  const isFavorite = favorites.some(
    (favorite) => favorite.idMeal === recipe.idMeal,
  );

  return (
    <main className="recipe-detail">
      <h1>{recipe.strMeal}</h1>
      <button
        type="button"
        onClick={() => toggleFavorite(recipe)}
        className="favorite-detail-button"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <img src={recipe.strMealThumb} alt={recipe.strMeal} />

      <p>Category: {recipe.strCategory}</p>
      <p>Cuisine: {recipe.strArea}</p>

      <h2>Ingredients</h2>

      <ul>
        {Array.from({ length: 20 }, (_, index) => {
          const ingredient = recipe[`strIngredient${index + 1}`];
          const measure = recipe[`strMeasure${index + 1}`];

          if (!ingredient) {
            return null;
          }

          return (
            <li key={index}>
              {measure} {ingredient}
            </li>
          );
        })}
      </ul>

      <h2>Instructions</h2>

      <div className="instructions">
        {recipe.strInstructions.split(/(?=step \d+)/i).map((step, index) => (
          <p key={index}>{step.trim()}</p>
        ))}
      </div>
    </main>
  );
}
export default RecipeDetailPage;
