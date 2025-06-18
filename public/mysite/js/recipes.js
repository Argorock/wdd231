let recipeData = {}; 


fetch('js/recipes.json')
  .then(response => response.json())
  .then(data => {
      recipeData = data; 
      const recipeContainer = document.querySelector('.folders');
      let folderHTML = "";

      Object.values(data.recipes).forEach(recipe => {
          folderHTML += `
              <div class="folder" onclick="openModal('${recipe.title}')">
                  <img src="images/closed-folder.PNG" alt="recipe-folder">
                  <p>${recipe.title}</p>
              </div>
          `;
      });

      recipeContainer.innerHTML = folderHTML;
  })
  .catch(error => console.error("Error loading recipes:", error));


function openModal(recipeTitle) {
    const recipe = recipeData.recipes[recipeTitle];

    if (!recipe) {
        console.error("Recipe not found:", recipeTitle);
        return;
    }

    document.getElementById("modal-title").textContent = recipe.title;

    const ingredientsList = document.getElementById("modal-ingredients");
    ingredientsList.innerHTML = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("");

    document.getElementById("modal-instructions").textContent = recipe.instructions;

    const modal = document.querySelector(".modal-container");
    console.log("Before:", modal.classList);
    
    modal.classList.remove("hide-modal");
    
    console.log("After:", modal.classList);
}
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.querySelector(".modal-container");
    const closeBtn = document.querySelector(".close-btn");

    closeBtn.addEventListener("click", () => {
        modal.classList.add("hide-modal");
    });


    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.add("hide-modal");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            modal.classList.add("hide-modal");
        }
    });
});
