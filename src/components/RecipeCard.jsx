import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
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
      </article>
    </Link>
  );
}
export default RecipeCard;
