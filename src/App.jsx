import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getThaiRecipes, searchThaiRecipes } from "./services/recipeApi";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import { FavoritesProvider } from "./context/FavoritesContext";
import AddRecipePage from "./pages/AddRecipePage";
import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
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

  async function handleSearch() {
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
    setSearchInput("");
    setError("");

    try {
      const data = await getThaiRecipes();
      setRecipes(data);
    } catch (error) {
      setError("Could not load Thai recipes.");
    }
  }
  return (
    <BrowserRouter>
    <FavoritesProvider>
      <div className="app-layout">
        <Header
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
          handleHome={handleHome}
        />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                recipes={recipes}
                loading={loading}
                error={error}
                handleHome={handleHome}
              />
            }
          />
          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          
          <Route path="/add-recipe" element={<AddRecipePage />} />

        </Routes>

        <Footer />
      </div>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
