import { useState, useEffect } from "react";

function AddRecipePage() {
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [formError, setFormError] = useState("");

  const [personalRecipes, setPersonalRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem("personalRecipes");

    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });
  useEffect(() => {
    localStorage.setItem("personalRecipes", JSON.stringify(personalRecipes));
  }, [personalRecipes]);

  return (
    <main className="add-recipe-page">
      <h1>Add Your Recipe</h1>

      <form
        className="recipe-form"
        onSubmit={(event) => {
          event.preventDefault();

          if (
            !recipeName.trim() ||
            !category.trim() ||
            !ingredients.trim() ||
            !instructions.trim()
          ) {
            setFormError("Please fill in all fields.");
            return;
          }

          setFormError("");

          const newRecipe = {
            id: Date.now(),
            name: recipeName,
            category: category,
            ingredients: ingredients,
            instructions: instructions,
          };

          setPersonalRecipes([...personalRecipes, newRecipe]);
        }}
      >
        <label>
          Recipe Name
          <input
            type="text"
            value={recipeName}
            onChange={(event) => setRecipeName(event.target.value)}
          />
        </label>

        <label>
          Category
          <input
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </label>

        <label>
          Ingredients
          <textarea
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
          />
        </label>

        <label>
          Instructions
          <textarea
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
          />
        </label>

        {formError && <p className="form-error">{formError}</p>}
        <button type="submit">Save Recipe</button>
      </form>


    <div className="your-recipes">
      <h2>Your Recipes</h2>

      {personalRecipes.map((recipe) => (
        <p key={recipe.id}>{recipe.name}</p>
      ))}
      </div>
    </main>
  );
}

export default AddRecipePage;
