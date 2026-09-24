import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

 const [favorites, setFavorites] = useState(() => {
  const savedFavorites = localStorage.getItem("favorites");

  return savedFavorites ? JSON.parse(savedFavorites) : [];
});

useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);
  
  function toggleFavorite(recipe) {
    const isFavorite = favorites.some(
      (favorite) => favorite.idMeal === recipe.idMeal
    );

    if (isFavorite) {
      setFavorites(
        favorites.filter(
          (favorite) => favorite.idMeal !== recipe.idMeal
        )
      );
    } else {
      setFavorites([...favorites, recipe]);
    }
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;