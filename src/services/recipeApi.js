const API_URL = "https://www.themealdb.com/api/json/v1/1";

export async function getThaiRecipes() {
  const response = await fetch(`${API_URL}/filter.php?a=Thai`);

  if (!response.ok) {
    throw new Error("Failed to fetch Thai recipes");
  }

  const data = await response.json();

  return data.meals;
}

export async function searchThaiRecipes(searchInput) {
  const response = await fetch(`${API_URL}/search.php?s=${searchInput}`);

  if (!response.ok) {
    throw new Error("Failed to search Thai recipes");
  }

  const data = await response.json();

  return data.meals;
}
export async function getRecipeById(id) {
  const response = await fetch(`${API_URL}/lookup.php?i=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data = await response.json();

  return data.meals?.[0];
}
