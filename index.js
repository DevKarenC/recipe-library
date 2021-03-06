class Recipe {
  constructor(
    name,
    time,
    difficulty,
    ingredients,
    instructionsLink,
    haveCooked
  ) {
    this.name = name;
    this.time = time;
    this.difficulty = difficulty;
    this.ingredients = ingredients;
    this.instructionsLink = instructionsLink;
    this.haveCooked = haveCooked;
  }
  toggleCookedStatus() {
    this.haveCooked = !this.haveCooked;
  }
}

const myRecipes = [];

const tomatoSoup = new Recipe(
  "Tomato Soup",
  "20 minutes",
  "Easy",
  "Butter, Onion, Garlic, Flour, Tomato, Tomato sauce, Chicken stock, Sugar, Salt, Pepper",
  "https://www.simplyrecipes.com/recipes/tomato_soup/",
  true
);

const chickenMacAndCheese = new Recipe(
  "Chicken Mac and Cheese",
  "45 minutes",
  "Easy",
  "Macaroni, Onion, Garlic, Butter, Flour, Milk, Cheddar cheese, Cooked chicken, Salt, Pepper",
  "https://www.simplyrecipes.com/recipes/easy_chicken_mac_and_cheese/",
  false
);

const greekSalad = new Recipe(
  "Greek Salad",
  "15 minutes",
  "Easy",
  "Olive oil, Lemon juice, Garlic, Vinegar, Oregano, Pepper, Tomatoes, Cucumber, Onion, Bell pepper, Olives, Feta Cheese",
  "https://www.simplyrecipes.com/recipes/dads_greek_salad/",
  false
);

myRecipes.push(tomatoSoup, chickenMacAndCheese, greekSalad);

(function () {
  const addRecipeButton = document.querySelector(".add-recipe-button");
  addRecipeButton.addEventListener("click", openModal);
  const saveRecipeButton = document.querySelector(".save-recipe-button");
  saveRecipeButton.addEventListener("click", saveRecipe);
})();

function openModal() {
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function saveRecipe() {
  const name = document.querySelector(".recipe-name").value;
  const time = document.querySelector(".recipe-time").value;
  const difficulty = document.querySelector(".recipe-difficulty").value;
  const ingredients = document.querySelector(".recipe-ingredients").value;
  const instructionsLink = document.querySelector(".recipe-instructionsLink")
    .value;
  const haveCooked = document.querySelector(".recipe-haveCooked").checked;
  const newRecipe = new Recipe(
    name,
    time,
    difficulty,
    ingredients,
    instructionsLink,
    haveCooked
  );
  myRecipes.push(newRecipe);
  displayRecipes(newRecipe);
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function displayRecipes(recipe) {
  const recipesContainer = document.querySelector(".recipes-container");
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipe-card");
  const recipeName = document.createElement("div");
  recipeName.classList.add("recipe-card-name");
  recipeName.textContent = recipe.name;
  const recipeTime = document.createElement("div");
  recipeTime.textContent = recipe.time;
  const recipeDifficulty = document.createElement("div");
  recipeDifficulty.textContent = recipe.difficulty;
  const recipeIngredients = document.createElement("div");
  recipeIngredients.classList.add("recipe-card-ingredients");
  recipeIngredients.textContent = recipe.ingredients;
  const recipeInstructions = document.createElement("div");
  const link = document.createElement("a");
  link.href = recipe.instructionsLink;
  link.target = "_blank";
  link.textContent = "Link to Recipe";
  recipeInstructions.appendChild(link);
  const cookedButton = document.createElement("button");
  if (recipe.haveCooked) {
    cookedButton.textContent = "Cooked 🍳";
  } else {
    cookedButton.textContent = "Not Cooked";
  }
  cookedButton.classList.add("cooked-toggle");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  const garbageBinIcon = document.createElement("i");
  garbageBinIcon.classList.add("far", "fa-trash-alt");
  deleteButton.appendChild(garbageBinIcon);
  recipeCard.append(
    recipeName,
    recipeTime,
    recipeDifficulty,
    recipeIngredients,
    recipeInstructions,
    cookedButton,
    deleteButton
  );
  recipesContainer.append(recipeCard);
  assignIndex();
  deleteRecipes();
  toggleCookedStatusDisplay();
}

// giving each recipe a data-attribute that corresponds to the index of the library array
function assignIndex() {
  let recipeElements = Array.from(document.querySelectorAll(".recipe-card"));
  for (let i = 0; i < recipeElements.length; i++) {
    const index = i;
    const recipeElement = recipeElements[i];
    recipeElement.setAttribute("data-index-num", `${index}`);
  }
}

assignIndex();

function deleteRecipes() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", function () {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this recipe.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Your recipe has been deleted.", {
            icon: "success",
          });
          // delete the selected recipe from myRecipes array using index
          const recipeIndex = deleteButton.parentNode.dataset.indexNum;
          myRecipes.splice(recipeIndex, 1);
          // remove the selected recipe from DOM
          const recipeContainer = document.querySelector(".recipes-container");
          let recipeElements = Array.from(
            document.querySelectorAll(".recipe-card")
          );
          recipeElements.forEach((recipeElement) => {
            if (recipeElement.dataset.indexNum === recipeIndex) {
              recipeContainer.removeChild(recipeElement);
            }
          });
          // reassign index for the remaining recipes
          assignIndex();
        } else {
          swal("Your recipe is safe!");
        }
      });
    });
  });
}

deleteRecipes();

function toggleCookedStatusDisplay() {
  const cookedToggleButtons = Array.from(
    document.querySelectorAll(".cooked-toggle")
  );
  cookedToggleButtons.forEach((toggleButton) => {
    toggleButton.addEventListener("click", function () {
      // need to know which index the toggleButton belongs to
      const toggleButtonIndex = toggleButton.parentNode.dataset.indexNum;
      // then I can access the object in the array with that index
      const recipeObject = myRecipes[toggleButtonIndex];
      // and run the prototype method on that object in the array
      recipeObject.toggleCookedStatus();
      if (toggleButton.textContent === "Cooked 🍳") {
        toggleButton.textContent = "Not Cooked";
      } else {
        toggleButton.textContent = "Cooked 🍳";
      }
    });
  });
}

toggleCookedStatusDisplay();
