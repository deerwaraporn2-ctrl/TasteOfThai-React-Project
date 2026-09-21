import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header({ searchInput, setSearchInput, handleSearch, handleHome,}) {
  return (
    <header className="site-header">
      <div className="header-content">
        <h1 className="logo">Taste Of Thai</h1>

        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
          
        />

        <nav className="navigation">
          <Link to="/" onClick={handleHome}>
            Home
          </Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
