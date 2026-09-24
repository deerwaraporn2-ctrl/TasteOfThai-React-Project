import { useState, useEffect } from "react";
import { getThaiRecipes, searchThaiRecipes } from "../services/recipeApi";

function useRecipes() {
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

  async function handleSearch(searchInput) {
    if (!searchInput.trim()) {
      setError("Opps...Please enter a recipe name");
      return;
    }

    setError("");

    try {
      const data = await searchThaiRecipes(searchInput);
      setRecipes(data || []);
    } catch (error) {
      setError("Could not search Thai recipes.");
    }
  }
  async function handleHome() {
    setError("");

    try {
      const data = await getThaiRecipes();
      setRecipes(data);
    } catch (error) {
      setError("Could not load Thai recipes.");
    }
  }
  return {
    recipes,
    loading,
    error,
    handleSearch,
    handleHome,
  };
}

export default useRecipes;
