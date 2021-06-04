let domUpdates = {
  updateWelcomeMessage(user) {
    let welcomeDiv = document.querySelector('.welcome-msg');
    let firstName = user.name.split(' ')[0];
    welcomeDiv.innerHTML = `
        <h1>Welcome ${firstName}!</h1>
    `;
  },

  listTags(allTags) {
    let tagList = document.getElementById('tagList');
    allTags.forEach(tag => {
      let tagHtml = `<li><input type="checkbox" class="checked-tag" id="${tag}">
        <label for="${tag}">${tag.toUpperCase()}</label></li>`;
      tagList.insertAdjacentHTML('beforeend', tagHtml);
    });
  },

  renderRecipeCards(cookbook) {
    let allRecipeCards = document.getElementById('allRecipeCards');
    let recipes = cookbook.cookbook;
    recipes.forEach(recipe => {
      let name = domUpdates.shortenNames(recipe);

      let cardHtml = `
        <div class="recipe-card" id=${recipe.id}>
          <h3>${name}</h3>
          <div class="card-photo-container">
            <img src=${recipe.image} class="card-photo-preview" alt="${recipe.name} recipe" title="${recipe.name} recipe">
            <div class="text">
              <div>Click for Instructions</div>
            </div>
          </div>
          <h4>${recipe.tags[0]}</h4>
          <img src="../images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
        </div>`;
      allRecipeCards.insertAdjacentHTML('beforeend', cardHtml);
    });
  },

  // we could potentially delete this function, I refactored it but I assume it had something to do with styling.
  shortenNames(recipe) {
    if (recipe.name.length > 40) {
      return recipe.name.substring(0, 40) + '...';
    } else {
      return recipe.name;
    }
  },

  ///////////// everything above this line is not total garbage /////////////
  togglePantryMenu() {
    //menuOpen is a very lazy way to do this. we should just makethe thing a button with a .disabledproperty
    
    let menuOpen = false;
    var menuDropdown = document.querySelector('.drop-menu');
    if (!menuOpen) {
      menuDropdown.style.display = 'none';
    } else {
      menuDropdown.style.display = 'block';
    }
  },

  displayPantryInfo(pantry) {
    pantry.forEach(ingredient => {
      let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
          <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
      document
        .querySelector('.pantry-list')
        .insertAdjacentHTML('beforeend', ingredientHtml);
    });
  },

  showAllRecipes() {
    recipes.forEach(recipe => {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = 'block';
    });
    showWelcomeBanner();
  },

  hideUnselectedRecipes(foundRecipes) {
    foundRecipes.forEach(recipe => {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = 'none';
    });
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

  //there shouldn't be any css in our scripts...
  showMyRecipesBanner() {
    document.querySelector('.welcome-msg').style.display = 'none';
    document.querySelector('.my-recipes-banner').style.display = 'block';
  },

  //there shouldn't be any css in our scripts...
  showWelcomeBanner() {
    document.querySelector('.welcome-msg').style.display = 'flex';
    document.querySelector('.my-recipes-banner').style.display = 'none';
  },

  //Remove CSS styling from JS?
  //domUpdates function
  openRecipeInfo(event) {
    fullRecipeInfo.style.display = 'inline';
    let recipeId = event.path.find(e => e.id).id;
    let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
    generateRecipeTitle(recipe, generateIngredients(recipe));
    addRecipeImage(recipe);
    generateInstructions(recipe);
    fullRecipeInfo.insertAdjacentHTML(
      'beforebegin',
      "<section id='overlay'></div>"
    );
  },

  generateRecipeTitle(recipe, ingredients) {
    let recipeTitle = `
      <button id="exit-recipe-btn">X</button>
      <h3 id="recipe-title">${recipe.name}</h3>
      <h4>Ingredients</h4>
      <p>${ingredients}</p>`;
    fullRecipeInfo.insertAdjacentHTML('beforeend', recipeTitle);
  },

  addRecipeImage(recipe) {
    document.getElementById(
      'recipe-title'
    ).style.backgroundImage = `url(${recipe.image})`;
  },

  exitRecipe() {
    while (
      fullRecipeInfo.firstChild &&
      fullRecipeInfo.removeChild(fullRecipeInfo.firstChild)
    ) {}
    fullRecipeInfo.style.display = 'none';
    document.getElementById('overlay').remove();
  },

  //This could definitely be broken down for more SRP code
  addToMyRecipes() {
    if (event.target.className === 'card-apple-icon') {
      let cardId = parseInt(event.target.closest('.recipe-card').id);
      if (!user.favoriteRecipes.includes(cardId)) {
        event.target.src = '../images/apple-logo.png';
        user.saveRecipe(cardId);
      } else {
        event.target.src = '../images/apple-logo-outline.png';
        user.removeRecipe(cardId);
      }
    } else if (event.target.id === 'exit-recipe-btn') {
      exitRecipe();
    } else if (
      isDescendant(event.target.closest('.recipe-card'), event.target)
    ) {
      openRecipeInfo(event);
    }
  },

  showSavedRecipes() {
    let unsavedRecipes = recipes.filter(recipe => {
      return !user.favoriteRecipes.includes(recipe.id);
    });
    unsavedRecipes.forEach(recipe => {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = 'none';
    });
    showMyRecipesBanner();
  }
};

export default domUpdates
