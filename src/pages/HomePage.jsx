import { useEffect, useState } from "react";
import { getThaiRecipes } from "../services/recipeApi";
import RecipeList from "../components/RecipeList";
import heroImage from "../assets/hero-thai.webp";

function HomePage() {
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

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">AUTHENTIC THAI FLAVOURS</p>

          <h1>
            Welcome to <span className="hero-title-accent">Taste Of Thai</span>
          </h1>

          <p className="hero-text">Discover delicious Thai recipes</p>

          <div className="hero-line"></div>
        </div>

        <img 
        className="hero-image"
        src={heroImage} 
        alt="" 
        />

      </section>

      <main>
        <RecipeList recipes={recipes} />
      </main>
    </>
  );
}

export default HomePage;
