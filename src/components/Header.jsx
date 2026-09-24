import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header({ searchInput, setSearchInput, handleSearch, handleHome }) {
  
  const navigate = useNavigate();

  function handleSearchAndNavigate() {
    navigate("/");
    handleSearch();
  }

  return (
    <header className="site-header">
      <div className="header-content">
        <h1 className="logo">Taste Of Thai</h1>

        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearchAndNavigate}
        />

        <nav className="navigation">
          <Link to="/" onClick={handleHome}>
            Home
          </Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/add-recipe">Add Your Recipe</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
