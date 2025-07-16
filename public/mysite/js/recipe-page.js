import { renderRecipe } from './full-recipe-page.js';

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

(async function() {
    const name = getRecipeNameFromURL();
    const recipes = await loadRecipes();
    const recipe = recipes.find(r => r.name === name);
    renderRecipe(recipe);
})();