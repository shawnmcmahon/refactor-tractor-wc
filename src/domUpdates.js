let fullRecipeInfo;

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
      let tagHtml = `<li><input type='checkbox' class='checked-tag' id="${tag}">
        <label for='${tag}'>${tag.toUpperCase()}</label></li>`;
      tagList.insertAdjacentHTML('beforeend', tagHtml);
    });
  },

  renderRecipeCards(cookbook, user) {
    user.viewHome()
    // user.isViewingFavorites = false;
    // user.isViewingRecipesToCook = false;
    let allRecipeCards = document.getElementById('allRecipeCards');
    let recipes = cookbook.cookbook;
    allRecipeCards.innerHTML = '';
    recipes.forEach(recipe => {
      let name = domUpdates.shortenNames(recipe);

      let cardHtml = `
        <div class='recipe-card' id=${recipe.id}>
          <h3>${name}</h3>
          <div class='card-photo-container'>
            <img src=${recipe.image} id=${recipe.id} class='card-photo-preview' alt='${recipe.name} recipe' title='${recipe.name} recipe'>
          </div>
          <h4>${recipe.tags[0]}</h4>
          <img src='../images/add-to-cook-queue-2.png' id=${recipe.id} alt="add to cook queue icon" class='card-silverware-icon'>
          <img src='../images/apple-logo-outline.png' id=${recipe.id} alt='unfilled apple icon' class='card-apple-icon'>
        </div>`;
      allRecipeCards.insertAdjacentHTML('beforeend', cardHtml);
    });
  },

  renderFavoriteRecipeCards(user) {
    let allRecipeCards = document.getElementById('allRecipeCards');
    let recipes = user.favoriteRecipes;
    // allRecipeCards.innerHTML = '';
    recipes.forEach(recipe => {
      let name = domUpdates.shortenNames(recipe);

      let cardHtml = `
        <div class='recipe-card' id=${recipe.id}>
          <h3>${name}</h3>
          <div class='card-photo-container'>
            <img src=${recipe.image} class='card-photo-preview' alt='${recipe.name} recipe' title='${recipe.name} recipe'>
          </div>
          <h4>${recipe.tags[0]}</h4>
          <img src='../images/add-to-cook-queue-2.png' id=${recipe.id} alt="add to cook queue icon" class='card-silverware-icon'>
          <img src='../images/apple-logo-outline.png' id=${recipe.id} alt='unfilled apple icon' class='card-apple-icon'>
        </div>`;
      allRecipeCards.insertAdjacentHTML('beforeend', cardHtml);
    });
  },

  // this isn't called anywhere??
  renderRecipeToCookCards(user) {
    user.viewCookBook();
    let allRecipeCards = document.getElementById('allRecipeCards');
    let recipes = user.recipesToCook;
    // allRecipeCards.innerHTML = '';
    recipes.forEach(recipe => {
      let name = domUpdates.shortenNames(recipe);

      let cardHtml = `
        <div class='recipe-card' id=${recipe.id}>
          <h3>${name}</h3>
          <div class='card-photo-container'>
            <img src='${recipe.image}' id=${recipe.id} class='card-photo-preview' alt='${recipe.name} recipe' title='${recipe.name} recipe'>
          </div>
          <h4>${recipe.tags[0]}</h4>
          <img src='../images/add-to-cook-queue-2.png' id=${recipe.id} alt="add to cook queue icon" class='card-silverware-icon'>
          <img src='../images/apple-logo-outline.png' id=${recipe.id}  alt='unfilled apple icon' class='card-apple-icon'>
        </div>`;
      allRecipeCards.insertAdjacentHTML('beforeend', cardHtml);
    });
  },

  renderSearchResults(results) {
    let allRecipeCards = document.getElementById('allRecipeCards');
    let recipes = results;
    allRecipeCards.innerHTML = '';

    recipes.forEach(recipe => {
      let name = domUpdates.shortenNames(recipe);

      let cardHtml = `
        <div class='recipe-card' id=${recipe.id}>
          <h3>${name}</h3>
          <div class='card-photo-container'>
            <img src='${recipe.image}' id=${recipe.id} class='card-photo-preview' alt='${recipe.name} recipe' title='${recipe.name} recipe'>
          </div>
          <h4>${recipe.tags[0]}</h4>
          <img src='../images/add-to-cook-queue-2.png' id=${recipe.id} alt="add to cook queue icon" class='card-silverware-icon'>
          <img src='../images/apple-logo-outline.png' id=${recipe.id} alt='unfilled apple icon' class='card-apple-icon'>
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

  togglePantryMenu() {
    var menuDropdown = document.querySelector('.drop-menu');
    let pantryBtn = document.getElementById('myPantryButton');
    let attr = pantryBtn.getAttribute('aria-expanded');
    if (attr === 'true') {
      pantryBtn.setAttribute('aria-expanded', false);
      menuDropdown.style.display = 'block';
    } else {
      pantryBtn.setAttribute('aria-expanded', true);
      menuDropdown.style.display = 'none';
    }
  },

  // this function needs info out of pantry class
  // once we have the names, we can render the pantry the DOM with all the items in our pantry
  // add a + and - button next to each one to do the post request
  // we don't actually want a checkbox, we want a plus and minus and the amount ex: " - 2 + "
  displayPantryInfo(pantry) {
    let updatePantryIngs = pantry.returnPantryIngredients();
    updatePantryIngs.forEach(ingredient => {
      let ingredientHtml = `<li><input type='checkbox' class='pantry-checkbox' id='${ingredient.name}'>
          <label for='${ingredient.name}'>${ingredient.name}, ${ingredient.amount}</label></li>`;
      document
        .querySelector('.pantry-list')
        .insertAdjacentHTML('beforeend', ingredientHtml);
    });

    // this can be modified into the post request
    let pantryCheckboxes = document.querySelectorAll('.pantry-checkbox');
    pantryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('click', () => {
        domUpdates.findCheckedPantryBoxes('click');
      });
    });
  },

  toggleBannerText() {
    let welcomeMessage = document.getElementById('welcomeMessage');
    let myRecipesBanner = document.getElementById('myRecipesBanner');
    welcomeMessage.classList.toggle('hidden');
    myRecipesBanner.classList.toggle('block');
  },

  openRecipeInfo(recipe) {
    allRecipeCards.innerHTML += `
    <div class="recipe-instructions" id="fullRecipeInstructions">
    `

    fullRecipeInfo = document.getElementById('fullRecipeInstructions');
    fullRecipeInfo.style.display = 'inline';
    domUpdates.generateRecipeTitle(recipe);
    domUpdates.generateIngredients(recipe);
    domUpdates.addRecipeImage(recipe);
    domUpdates.generateRecipeCost(recipe);
    domUpdates.generateInstructions(recipe);
    fullRecipeInfo.insertAdjacentHTML(
      'beforebegin',
      '<section id="overlay"></div>'
    );
  },

  generateRecipeTitle(recipe) {
    let recipeTitle = `
      <button id='exit-recipe-btn'>X</button>
      <h3 id='recipe-title'>${recipe.name}</h3>
      <h4>Ingredients</h4>
      <p id="ingredientsSection"></p>
      `;
    fullRecipeInfo.insertAdjacentHTML('beforeend', recipeTitle);
  },

  generateIngredients(recipe) {
    let ingSection = document.getElementById('ingredientsSection');

    let allIngredientInfo = recipe.getIngredients();
    allIngredientInfo.forEach(ingredient => {
      let ingName = ingredient.name;
      let ingAmount = ingredient.quantity.amount;
      let ingUnit = ingredient.quantity.unit;

      ingSection.innerText += `
      ${ingName}, ${ingAmount}, ${ingUnit}
      `;
    });
  },

  generateRecipeCost(recipe) {
    let ingSection = document.getElementById('ingredientsSection');
    let cost = recipe.getRecipeCost();
    let insertCost = `<h5>Total Recipe Cost: ${cost}</h5>`;
    ingSection.insertAdjacentHTML('beforeend', insertCost);
  },

  addRecipeImage(recipe) {
    document.getElementById(
      'recipe-title'
    ).style.backgroundImage = `url(${recipe.image})`;
  },

  generateInstructions(recipe) {
    let instructionsList = '';
    let instructions = recipe.instructions.map(i => {
      return i.instruction;
    });
    instructions.forEach(i => {
      instructionsList += `<li>${i}</li>`;
    });
    fullRecipeInfo.insertAdjacentHTML(
      'beforeend',
      '<h4 id="instructionsHeader">Instructions</h4>'
    );
    fullRecipeInfo.insertAdjacentHTML(
      'beforeend',
      `<ol>${instructionsList}</ol>`
    );
  },

  exitRecipe(event) {
    let overlay = document.getElementById('overlay');

    if (event.target.id === 'exit-recipe-btn') {
      while (
        fullRecipeInfo.firstChild &&
        fullRecipeInfo.removeChild(fullRecipeInfo.firstChild)
      ) {
        fullRecipeInfo.style.display = 'none';
        overlay.remove();
      }
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
  },

  ///////////// everything above this line is not total garbage /////////////

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

  // addToRecipesToCook() {
  //   if (event.target.className === 'card-silverware-icon') {
  //     let cardId = parseInt(event.target.closest('.recipe-card').id);
  //     if (!user.recipesToCook.includes(cardId)) {
  //       event.target.src = '../images/remove-from-cook-queue.png';
  //       user.decideToCook(cardId);
  //     } else {
  //       event.target.src = '../images/add-to-cook-queue-2.png';
  //       user.removeFromRecipesToCook(cardId);
  //       console.log(user.recipesToCook)
  //     }
  //   }
  //
  // },
}

export default domUpdates
