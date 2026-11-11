
import { useState, useContext } from "react";
import { PersonalRecipesContext } from "../context/PersonalRecipesContext";
import RecipeList from "../components/RecipeList";
import heroImage from "../assets/hero-thai.webp";
import RecipeFilter from "../components/RecipeFilter";

function HomePage({ recipes, loading, error, handleHome }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { personalRecipes } = useContext(PersonalRecipesContext);

  async function handleCategoryChange(category) {
    setSelectedCategory(category);

    if (recipes.length === 0) {
      await handleHome();
    }
  }

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter(
          (recipe) => recipe.strCategory === selectedCategory
        );

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">AUTHENTIC THAI FLAVOURS</p>

          <h1>
            Welcome to <span className="hero-title-accent">
              Taste Of Thai
            </span>
          </h1>

          <p className="hero-text">
            Discover delicious Thai recipes
          </p>

          <div className="hero-line"></div>
        </div>

        <img className="hero-image" src={heroImage} alt="" />
      </section>

      <main>
        <RecipeFilter setSelectedCategory={handleCategoryChange} />

        {error ? (
          <div className="search-message">
            <div className="chef-hat">👨‍🍳</div>
            <p>{error}</p>
          </div>
        ) : (
          <RecipeList recipes={filteredRecipes} />
        )}

        {selectedCategory === "All" &&
          personalRecipes.length > 0 && (
            <section className="personal-recipes-section">
              <h2>Your Recipes</h2>
              <p>Recipes added by you</p>

              <RecipeList
                recipes={personalRecipes}
                isPersonal={true}
              />
            </section>
          )}
      </main>
    </>
  );
}

export default HomePage;
