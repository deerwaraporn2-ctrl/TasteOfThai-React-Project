import { createContext, useState } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

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