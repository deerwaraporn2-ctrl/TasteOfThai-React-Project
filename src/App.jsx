import { useState } from "react";
import useRecipes from "./hooks/useRecipes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  const {
  recipes,
  loading,
  error,
  handleSearch: searchRecipes,
  handleHome,
} = useRecipes();

function handleSearch() {
  searchRecipes(searchInput);
  setSearchInput(""); 
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
