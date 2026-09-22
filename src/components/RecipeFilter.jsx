function RecipeFilter({ selectedCategory, setSelectedCategory }) {
    return (
        <div className="recipe-filter">
            <button onClick={() => setSelectedCategory("All")}>All</button>
            <button onClick={() => setSelectedCategory("Beef")}>Beef</button>
            <button onClick={() => setSelectedCategory("Chicken")}>Chicken</button>
            <button onClick={() => setSelectedCategory("Pork")}>Pork</button>
            <button onClick={() => setSelectedCategory("Seafood")}>Seafood</button>
        </div>
    )
}
export default RecipeFilter;