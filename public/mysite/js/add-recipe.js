const ingredientFields = document.getElementById('ingredient-fields');
const addIngredientBtn = document.getElementById('add-ingredient');
const recipeForm = document.getElementById('recipe-form');
const imageInput = document.getElementById('recipe-image');
const imagePreview = document.getElementById('image-preview');
let imageDataUrl = "";

// Add first ingredient row by default
addIngredientRow();

addIngredientBtn.addEventListener('click', addIngredientRow);

function addIngredientRow() {
    const row = document.createElement('div');
    row.className = 'ingredient-row';
    row.innerHTML = `
        <input type="number" min="0" step="any" placeholder="Qty" class="ingredient-qty" required>
        <input type="text" placeholder="Unit" class="ingredient-unit" required>
        <input type="text" placeholder="Ingredient" class="ingredient-name" required>
        <button type="button" class="remove-ingredient" title="Remove ingredient">&times;</button>
    `;
    row.querySelector('.remove-ingredient').onclick = () => row.remove();
    ingredientFields.appendChild(row);
}

// Image preview logic
imageInput.addEventListener('change', function() {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageDataUrl = e.target.result;
            imagePreview.src = imageDataUrl;
            imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        imageDataUrl = "";
        imagePreview.src = "";
        imagePreview.style.display = "none";
    }
});

imageInput.addEventListener('change', function() {
    const file = imageInput.files[0];
    const uploadText = document.getElementById('image-upload-text');
    if (file) {
        uploadText.textContent = `📷 ${file.name}`;
    } else {
        uploadText.textContent = "📷 Add a Recipe Image";
    }
});

// Make the submit handler async for fetch
recipeForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('recipe-name').value.trim();
    const instructions = document.getElementById('instructions').value
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

    const ingredients = Array.from(document.querySelectorAll('.ingredient-row')).map(row => ({
        qty: row.querySelector('.ingredient-qty').value,
        unit: row.querySelector('.ingredient-unit').value,
        ingredient: row.querySelector('.ingredient-name').value
    }));

    if (!name || ingredients.length === 0 || instructions.length === 0) {
        alert('Please fill out all fields.');
        return;
    }

    const newRecipe = { name, ingredients, instructions, image: imageDataUrl };

    // Try to get existing recipes from localStorage
    let recipes = JSON.parse(localStorage.getItem('recipes'));

    // If not in localStorage, fetch from JSON file
    if (!recipes) {
        const response = await fetch('js/recipes.json');
        const data = await response.json();
        recipes = data.recipes;
    }

    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    alert('Recipe added! You can now see it on the home page.');
    recipeForm.reset();
    ingredientFields.innerHTML = '';
    addIngredientRow();
});