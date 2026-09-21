function SearchBar({ searchInput, setSearchInput, handleSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Thai recipes..."
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
      />

      <button
        className="search-button"
        type="button"
        aria-label="Search"
        onClick={handleSearch}
      >
        🔍
      </button>
    </div>
  );
}
export default SearchBar;
