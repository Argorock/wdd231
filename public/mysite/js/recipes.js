let recipes = [];

const local = localStorage.getItem('recipes');
if (local) {
    recipes = JSON.parse(local);
    renderFolders(recipes);
} else {
    fetch('js/recipes.json')
      .then(response => response.json())
      .then(data => {
          recipes = data.recipes;
          renderFolders(recipes);
      })
      .catch(error => console.error("Error loading recipes:", error));
}

function renderFolders(recipes) {
    const recipeContainer = document.querySelector('.folders');
    let folderHTML = "";

    recipes.forEach(recipe => {
        folderHTML += `
            <div class="folder" onclick="openModal('${recipe.name.replace(/'/g, "\\'")}')">
                <img src="images/closed-folder.PNG" alt="recipe-folder">
                <p>${recipe.name}</p>
            </div>
        `;
    });

    recipeContainer.innerHTML = folderHTML;
}

function openModal(recipeName) {
    const recipe = recipes.find(r => r.name === recipeName);

    if (!recipe) {
        console.error("Recipe not found:", recipeName);
        return;
    }

    document.getElementById("modal-title").textContent = recipe.name;

    const ingredientsList = document.getElementById("modal-ingredients");
    ingredientsList.innerHTML = recipe.ingredients
        .map(ingredient => `<li>${ingredient.qty} ${ingredient.unit} ${ingredient.ingredient}</li>`)
        .join("");

    const instructionsList = document.getElementById("modal-instructions");
    instructionsList.innerHTML = recipe.instructions
        .map(step => `<li>${step}</li>`)
        .join("");

    const modal = document.querySelector(".modal-container");
    modal.classList.remove("hide-modal");

    document.querySelector('.close-btn').onclick = closeModal;
    modal.onclick = function(e) {
        if (e.target === modal) closeModal();
    };
    document.onkeydown = function(e) {
        if (e.key === "Escape") closeModal();
    };
    const deleteBtn = document.getElementById('delete-recipe-btn');
    deleteBtn.onclick = function() {
        if (confirm(`Delete "${recipe.name}"? This cannot be undone.`)) {
            recipes = recipes.filter(r => r.name !== recipe.name);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            closeModal();
            renderFolders(recipes);
        }
    };

    const viewFullBtn = document.getElementById('view-full-btn');
    viewFullBtn.onclick = function() {
        window.location.href = `recipe.html?name=${encodeURIComponent(recipe.name)}`;
    };
}

function closeModal() {
    const modal = document.querySelector(".modal-container");
    modal.classList.add("hide-modal");
    
    document.onkeydown = null;
    modal.onclick = null;
    document.querySelector('.close-btn').onclick = null;
}

function addRecipe(newRecipe) {
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    renderFolders(recipes);
}



