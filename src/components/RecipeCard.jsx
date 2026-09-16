function RecipeCard({ recipe }) {
    return (
        <article>
            <img 
            src={recipe.strMealThumb}
            alt={recipe.strMeal} 
            />

            <h2>{recipe.strMeal}</h2>
        </article>
    )
}
export default RecipeCard;