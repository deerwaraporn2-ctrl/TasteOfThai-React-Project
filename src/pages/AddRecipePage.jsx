import { useState, useContext } from "react";
import { PersonalRecipesContext } from "../context/PersonalRecipesContext";

// Convert saved text into an array of lines.
// This also allows older saved recipes to remain readable.
function toLines(value) {
  if (!value) {
    return [];
  }

  const lines = Array.isArray(value)
    ? value
    : value.split(/\r?\n/);

  return lines
    .map((line) => line.trim())
    .filter(Boolean);
}

function AddRecipePage() {
  const {
    personalRecipes,
    addPersonalRecipe,
    updatePersonalRecipe,
    deletePersonalRecipe,
  } = useContext(PersonalRecipesContext);

  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [formError, setFormError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState("");

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("Please select an image file.");
      return;
    }

    if (file.size > 1024 * 1024) {
      setFormError("Image must be smaller than 1 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      setFormError("");
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!recipeName.trim() || !ingredients.trim() || !instructions.trim()) {
      setFormError("Please fill in all fields.");
      return;
    }

    setFormError("");

    const recipe = {
      id: editingId || Date.now(),
      name: recipeName.trim(),
      image,
      ingredients: toLines(ingredients),
      instructions: toLines(instructions),
    };

    if (editingId) {
      updatePersonalRecipe(recipe);
    } else {
      addPersonalRecipe(recipe);
    }

    resetForm();
    setImage("");
  }

  function resetForm() {
    setRecipeName("");
    setIngredients("");
    setInstructions("");
    setEditingId(null);
    setFormError("");
  }

  function handleEdit(recipe) {
    setEditingId(recipe.id);
    setRecipeName(recipe.name);

    setIngredients(
      Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join("\n")
        : recipe.ingredients || "",
    );

    setInstructions(
      Array.isArray(recipe.instructions)
        ? recipe.instructions.join("\n")
        : recipe.instructions || "",
    );

    setFormError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    deletePersonalRecipe(id);

    if (editingId === id) {
      resetForm();
    }
  }

  return (
    <main className="add-recipe-page">
      <h1>Add Your Recipe</h1>

      <form className="recipe-form" onSubmit={handleSubmit}>
        <label>
          Recipe Name
          <input
            type="text"
            value={recipeName}
            onChange={(event) => setRecipeName(event.target.value)}
            placeholder="Enter recipe name"
          />
        </label>

        <label>
          Upload Recipe Image
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        {image && (
          <div className="image-preview">
            <img src={image} alt="Recipe preview" />
          </div>
        )}

        <label>
          Ingredients
          <textarea
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            placeholder={
              "Enter one ingredient per line:\nVegetable oil\nGarlic\nChicken stock\nGinger"
            }
          />
        </label>

        <label>
          Instructions
          <textarea
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
            placeholder={
              "Write each step on a new line:\nStep 1: Prepare the garlic oil.\nStep 2: Prepare the broth.\nStep 3: Cook the pork."
            }
          />
        </label>

        {formError && <p className="form-error">{formError}</p>}

        <button type="submit">
          {editingId ? "Update Recipe" : "Save Recipe"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>

      <div className="your-recipes">
        <h2>Your Recipes</h2>

        {personalRecipes.length === 0 ? (
          <p>You haven't added any recipes yet.</p>
        ) : (
          personalRecipes.map((recipe) => (
            <div key={recipe.id} className="personal-recipe">
              <h3>{recipe.name}</h3>

              <h4>Ingredients</h4>

              <ul>
                {toLines(recipe.ingredients).map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>

              <h4>Instructions</h4>

              <div className="instructions">
                {toLines(recipe.instructions).map((step, index) => (
                  <p key={index}>{step}</p>
                ))}
              </div>

              <button type="button" onClick={() => handleEdit(recipe)}>
                Edit
              </button>

              <button type="button" onClick={() => handleDelete(recipe.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default AddRecipePage;
