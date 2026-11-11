
import { createContext, useState, useEffect } from "react";

export const PersonalRecipesContext = createContext();

export function PersonalRecipesProvider({ children }) {
  const [personalRecipes, setPersonalRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem("personalRecipes");

    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "personalRecipes",
      JSON.stringify(personalRecipes)
    );
  }, [personalRecipes]);

  function addPersonalRecipe(recipe) {
    setPersonalRecipes((prevRecipes) => [
      ...prevRecipes,
      recipe,
    ]);
  }

  function updatePersonalRecipe(updatedRecipe) {
    setPersonalRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id
          ? updatedRecipe
          : recipe
      )
    );
  }

  function deletePersonalRecipe(id) {
    setPersonalRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    );
  }

  return (
    <PersonalRecipesContext.Provider
      value={{
        personalRecipes,
        addPersonalRecipe,
        updatePersonalRecipe,
        deletePersonalRecipe,
      }}
    >
      {children}
    </PersonalRecipesContext.Provider>
  );
}
