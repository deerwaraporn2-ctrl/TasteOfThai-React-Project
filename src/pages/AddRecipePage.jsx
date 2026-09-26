import { useState, useEffect } from "react";

function AddRecipePage() {
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [formError, setFormError] = useState("");
  const [editingId, setEditingId] = useState(null);

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

          if (editingId) {
            setPersonalRecipes(
              personalRecipes.map((recipe) =>
                recipe.id === editingId
                  ? { ...recipe, ...newRecipe, id: editingId }
                  : recipe,
              ),
            );
          } else {
            setPersonalRecipes([...personalRecipes, newRecipe]);
          }
          setRecipeName("");
          setCategory("");
          setIngredients("");
          setInstructions("");
          setEditingId(null);
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
          <div key={recipe.id} className="personal-recipe">
            <h3>{recipe.name}</h3>

            <p>
              <strong>Category:</strong>
              <br />
              {recipe.category}
            </p>

            <p>
              <strong>Ingredients:</strong>
              <br />
              {recipe.ingredients}
            </p>

            <p>
              <strong>Instructions:</strong>
              <br />
              {recipe.instructions}
            </p>

            <button
              type="button"
              onClick={() =>
                setPersonalRecipes(
                  personalRecipes.filter((item) => item.id !== recipe.id),
                )
              }
            >
              Delete
            </button>

            <button
              type="button"
              onClick={() => {
                setEditingId(recipe.id);
                setRecipeName(recipe.name);
                setCategory(recipe.category);
                setIngredients(recipe.ingredients);
                setInstructions(recipe.instructions);
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default AddRecipePage;
