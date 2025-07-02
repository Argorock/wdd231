function getRecipeNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name');
}

async function loadRecipes() {
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    if (!recipes) {
        const response = await fetch('js/recipes.json');
        const data = await response.json();
        recipes = data.recipes;
    }
    return recipes;
}

function renderRecipe(recipe) {
    const container = document.getElementById('recipe-details');
    if (!recipe) {
        container.innerHTML = "<p>Recipe not found.</p>";
        return;
    }
    container.innerHTML = `
        <h1>${recipe.name}</h1>
        ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" style="max-width:300px;border-radius:12px;margin-bottom:1rem;">` : ""}
        <h3>Ingredients</h3>
        <ul>${recipe.ingredients.map(i => `<li>${i.qty} ${i.unit} ${i.ingredient}</li>`).join('')}</ul>
        <h3>Instructions</h3>
        <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
    `;
}

(async function() {
    const name = getRecipeNameFromURL();
    const recipes = await loadRecipes();
    const recipe = recipes.find(r => r.name === name);
    renderRecipe(recipe);
})();