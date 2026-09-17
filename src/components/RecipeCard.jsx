function RecipeCard({ recipe }) {
    return (
        <article className="recipe-card">
            <img 
            className="recipe-card-image"
            src={recipe.strMealThumb}
            alt={recipe.strMeal} 
            />
            
            <div className="recipe-card-content">
                <h2>{recipe.strMeal}</h2>
            </div>            
        </article>
    )
}
export default RecipeCard;