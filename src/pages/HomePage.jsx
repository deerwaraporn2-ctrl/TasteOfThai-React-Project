import { useEffect, useState } from "react";
import { getThaiRecipes } from "../services/recipeApi";
import RecipeCard from "../components/RecipeCard";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await getThaiRecipes();
        setRecipes(data);
      } catch (error) {
        setError("Could not load Thai recipes.");
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, []);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Welcome to Taste Of Thai</h1>
      <p>Discover delicious Thai recipes</p>
      
      <div>
        {recipes.map((recipe) => (
            <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            />
            ))}
      </div>
      
    </main>
  );
}

export default HomePage;
