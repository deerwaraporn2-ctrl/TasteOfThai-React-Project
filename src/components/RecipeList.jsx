import RecipeCard from "./RecipeCard";

function RecipeList({ recipes }) {
  
  if (recipes.length === 0) {
    return (
      <div className="search-message">
        <div className="chef-hat">👨‍🍳</div>
        <p>No recipes found. Try another search.</p>
      </div>
    );
  }
  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;
