import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { PersonalRecipesContext } from "../context/PersonalRecipesContext";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeApi";
import heroImage from "../assets/hero-thai.webp";

function formatIngredients(ingredients) {
  if (!ingredients) return [];

  if (Array.isArray(ingredients)) {
    return ingredients.filter(Boolean);
  }

  if (typeof ingredients !== "string") return [];

  return ingredients
    .split(/\n|,/)
    .map((item) => item.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
}

function formatInstructions(instructions) {
  if (!instructions) return [];

  if (Array.isArray(instructions)) {
    return instructions.filter(Boolean);
  }

  if (typeof instructions !== "string") return [];

  return instructions
    .split(/(?=\bstep\s+\d+\b)/i)
    .map((step) => step.trim())
    .filter(Boolean);
}

function RecipeDetailPage() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { personalRecipes } = useContext(PersonalRecipesContext);

  const { id } = useParams();

  const [apiRecipe, setApiRecipe] = useState(null);
  const [error, setError] = useState("");

  const personalRecipe = personalRecipes.find(
    (recipe) => String(recipe.id) === id,
  );

  useEffect(() => {
    async function loadRecipe() {
      if (personalRecipe) {
        setApiRecipe(null);
        setError("");
        return;
      }

      setApiRecipe(null);
      setError("");

      try {
        const data = await getRecipeById(id);

        if (!data) {
          setError("Could not find this recipe.");
          return;
        }

        setApiRecipe(data);
      } catch {
        setError("Could not load this recipe.");
      }
    }

    loadRecipe();
  }, [id, personalRecipe]);

  if (error) {
    return (
      <div className="search-message">
        <div className="chef-hat">👨‍🍳</div>
        <p>{error}</p>
      </div>
    );
  }

  const recipe = personalRecipe || apiRecipe;

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  const isPersonal = Boolean(personalRecipe);

  const isFavorite =
    !isPersonal &&
    favorites.some((favorite) => favorite.idMeal === recipe.idMeal);

  // Get recipe information
  const recipeName = isPersonal ? recipe.name : recipe.strMeal;

  const ingredients = isPersonal
    ? formatIngredients(recipe.ingredients)
    : Array.from({ length: 20 }, (_, index) => {
        const ingredient = recipe[`strIngredient${index + 1}`];
        const measure = recipe[`strMeasure${index + 1}`];

        return ingredient
          ? `${measure ? measure.trim() + " " : ""}${ingredient}`
          : null;
      }).filter(Boolean);

  const instructions = formatInstructions(
    isPersonal ? recipe.instructions : recipe.strInstructions,
  );

  return (
    <main className="recipe-detail">
      <h1>{recipeName}</h1>

      {!isPersonal && (
        <button
          type="button"
          onClick={() => toggleFavorite(recipe)}
          className="favorite-detail-button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      )}

      <img
        src={isPersonal ? recipe.image || heroImage : recipe.strMealThumb}
        alt={recipeName}
      />

      {!isPersonal && (
        <>
          <p>Category: {recipe.strCategory}</p>
          <p>Cuisine: {recipe.strArea}</p>
        </>
      )}

      <section className="recipe-ingredients">
        <h2>Ingredients</h2>

        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section className="recipe-instructions">
        <h2>Instructions</h2>

        <ol>
          {instructions.map((step, index) => (
            <li key={index}>{step.replace(/^step\s+\d+\s*[:.-]?\s*/i, "")}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}

export default RecipeDetailPage;
