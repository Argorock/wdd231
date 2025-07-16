// renderRecipe.js

export function renderRecipe(recipe) {
  const container = document.getElementById('recipe-details');
  if (!recipe) {
    container.innerHTML = "<p>Recipe not found.</p>";
    document.title = "Recipe Not Found | The Flavor Files";
    return;
  }
  document.title = `${recipe.name} | The Flavor Files`;

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const isFavorite = favorites.includes(recipe.name);
  let multiplier = 1;

  container.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <h1>${recipe.name}</h1>
      <button id="favorite-btn" title="Toggle Favorite">${isFavorite ? "★" : "☆"}</button>
    </div>
    ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" style="max-width:300px;">` : ""}
    <div>
      <label for="multiplier">Ingredient Multiplier:</label>
      <input type="number" id="multiplier" value="1" min="0.25" step="0.25">
    </div>
    <h3>Ingredients</h3>
    <ul id="ingredients-list">
      ${recipe.ingredients.map(i => `<li data-qty="${i.qty}">${i.qty} ${i.unit} ${i.ingredient}</li>`).join('')}
    </ul>
    <h3>Instructions</h3>
    <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
    <button id="edit-btn">Edit Recipe</button>
  `;

  document.getElementById('favorite-btn').onclick = function () {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(recipe.name)) {
      favorites = favorites.filter(f => f !== recipe.name);
    } else {
      favorites.push(recipe.name);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderRecipe(recipe);
  };

  document.getElementById('multiplier').oninput = function () {
    multiplier = parseFloat(this.value) || 1;
    const list = document.getElementById('ingredients-list');
    Array.from(list.children).forEach((li, idx) => {
      const origQty = parseFloat(recipe.ingredients[idx].qty);
      const newQty = (origQty * multiplier).toFixed(2);
      li.innerHTML = `${newQty} ${recipe.ingredients[idx].unit} ${recipe.ingredients[idx].ingredient}`;
    });
  };

  document.getElementById('edit-btn').onclick = function () {
    alert('Edit functionality coming soon!');
  };
}