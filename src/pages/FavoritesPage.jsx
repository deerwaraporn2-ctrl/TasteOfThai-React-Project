import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import RecipeList from "../components/RecipeList";

function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <main>
      <h1>My Favorites</h1>
      <p>See Your saved Thai recipes here</p>

      {favorites.length === 0 ? (
        <div className="search-message">
          <div className="chef-hat">👨‍🍳</div>
          <p>You currently have no favorite recipes.</p>
        </div>
      ) : (
        <RecipeList recipes={favorites} />
      )}
    </main>
  );
}

export default FavoritesPage;
