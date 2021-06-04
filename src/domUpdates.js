let domUpdates = {
  updateWelcomeMessage() {
    let welcomeMsg = `
      <div class="welcome-msg">
        <h1>Welcome ${firstName}!</h1>
      </div>`;
    document.querySelector(".banner-image").insertAdjacentHTML("afterbegin",
      welcomeMsg);
  },

  displayPantryInfo(pantry) {
    pantry.forEach(ingredient => {
      let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
          <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
      document.querySelector(".pantry-list").insertAdjacentHTML("beforeend",
        ingredientHtml);
    })
  },

  showAllRecipes() {
    recipes.forEach(recipe => {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = "block";
    });
    showWelcomeBanner();
  },

   hideUnselectedRecipes(foundRecipes) {
    foundRecipes.forEach(recipe => {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = "none";
    });
  },

  createCards() {
    recipeData.forEach(recipe => {
      let recipeInfo = new Recipe(recipe);
  // Why are they shortening the name of the recipe? Is this necessary? Probably not
  //
      let shortRecipeName = recipeInfo.name;
      recipes.push(recipeInfo);
      if (recipeInfo.name.length > 40) {
        shortRecipeName = recipeInfo.name.substring(0, 40) + "...";
      }
      addToDom(recipeInfo, shortRecipeName)
    });
  },

  addToDom(recipeInfo, shortRecipeName) {
    let cardHtml = `
      <div class="recipe-card" id=${recipeInfo.id}>
        <h3 maxlength="40">${shortRecipeName}</h3>
        <div class="card-photo-container">
          <img src=${recipeInfo.image} class="card-photo-preview" alt="${recipeInfo.name} recipe" title="${recipeInfo.name} recipe">
          <div class="text">
            <div>Click for Instructions</div>
          </div>
        </div>
        <h4>${recipeInfo.tags[0]}</h4>
        <img src="../images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
      </div>`
  // Should NEVER be inserting html into Main. Find another, better HTML tag to insert into
    main.insertAdjacentHTML("beforeend", cardHtml);
  },

  toggleMenu() {
    var menuDropdown = document.querySelector(".drop-menu");
    menuOpen = !menuOpen;
    if (menuOpen) {
      menuDropdown.style.display = "block";
    } else {
      menuDropdown.style.display = "none";
    }
  },


  //Is this domUpdates?
  //delete this?? It is used in addToMyRecipes which is in User
  isDescendant(parent, child) {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  },

  listTags(allTags) {
    allTags.forEach(tag => {
      let tagHtml = `<li><input type="checkbox" class="checked-tag" id="${tag}">
        <label for="${tag}">${capitalize(tag)}</label></li>`;
      tagList.insertAdjacentHTML("beforeend", tagHtml);
    });
  },

  //there shouldn't be any css in our scripts...
  showMyRecipesBanner() {
    document.querySelector(".welcome-msg").style.display = "none";
    document.querySelector(".my-recipes-banner").style.display = "block";
  },

  //there shouldn't be any css in our scripts...
  showWelcomeBanner() {
    document.querySelector(".welcome-msg").style.display = "flex";
    document.querySelector(".my-recipes-banner").style.display = "none";
  },

  //Remove CSS styling from JS?
  //domUpdates function
  openRecipeInfo(event) {
    fullRecipeInfo.style.display = "inline";
    let recipeId = event.path.find(e => e.id).id;
    let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
    generateRecipeTitle(recipe, generateIngredients(recipe));
    addRecipeImage(recipe);
    generateInstructions(recipe);
    fullRecipeInfo.insertAdjacentHTML("beforebegin", "<section id='overlay'></div>");
  },

  generateRecipeTitle(recipe, ingredients) {
    let recipeTitle = `
      <button id="exit-recipe-btn">X</button>
      <h3 id="recipe-title">${recipe.name}</h3>
      <h4>Ingredients</h4>
      <p>${ingredients}</p>`
    fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
  },

  addRecipeImage(recipe) {
    document.getElementById("recipe-title").style.backgroundImage = `url(${recipe.image})`;
  },

  exitRecipe() {
    while (fullRecipeInfo.firstChild &&
      fullRecipeInfo.removeChild(fullRecipeInfo.firstChild));
    fullRecipeInfo.style.display = "none";
    document.getElementById("overlay").remove();
  },

  //This could definitely be broken down for more SRP code
  addToMyRecipes() {
    if (event.target.className === "card-apple-icon") {
      let cardId = parseInt(event.target.closest(".recipe-card").id)
      if (!user.favoriteRecipes.includes(cardId)) {
        event.target.src = "../images/apple-logo.png";
        user.saveRecipe(cardId);
      } else {
        event.target.src = "../images/apple-logo-outline.png";
        user.removeRecipe(cardId);
      }
    } else if (event.target.id === "exit-recipe-btn") {
      exitRecipe();
    } else if (isDescendant(event.target.closest(".recipe-card"), event.target)) {
      openRecipeInfo(event);
    }
  },

  showSavedRecipes() {
   let unsavedRecipes = recipes.filter(recipe => {
     return !user.favoriteRecipes.includes(recipe.id);
   });
   unsavedRecipes.forEach(recipe => {
     let domRecipe = document.getElementById(`${recipe.id}`);
     domRecipe.style.display = "none";
   });
   showMyRecipesBanner();
 }




};

export default domUpdates
