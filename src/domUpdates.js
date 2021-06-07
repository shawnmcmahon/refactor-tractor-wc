/* eslint-disable max-len */
let fullRecipeInfo;

let domUpdates = {
  show(element) {
    element.classList.remove('hidden')
  },

  hide(element) {
    element.classList.add('hidden')
  },

  updateWelcomeMessage(user) {
    let welcomeMessage = document.getElementById('welcomeMessage');
    let myRecipesBanner = document.getElementById('myRecipesBanner');
    domUpdates.hide(myRecipesBanner);
    domUpdates.show(welcomeMessage);
    let firstName = user.name.split(' ')[0];
    welcomeMessage.innerHTML = `
        <h1>Welcome ${firstName}!</h1>
    `;
  },

  updateBanner(event) {
    let welcomeMessage = document.getElementById('welcomeMessage');
    let myRecipesBanner = document.getElementById('myRecipesBanner');
    let bannerText = document.getElementById('bannerText')
    domUpdates.hide(welcomeMessage)
    domUpdates.show(myRecipesBanner)

    let target = event.target.closest('button').id

    if (target.includes('Fav')) {
      bannerText.innerText = 'My Favorite Recipes'
    } else if (target.includes('Cook')) {
      bannerText.innerText = 'My Cooking Queue';
    }
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
    user.viewHome();
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
          <img src='../images/apple-logo.png' id=${recipe.id} alt='unfilled apple icon' class='card-apple-icon filled-apple-icon hidden'>
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
          <img src='/images/apple-logo.png' id=${recipe.id} alt='unfilled apple icon' class='card-apple-icon filled-apple-icon hidden'>
        </div>`;
      allRecipeCards.insertAdjacentHTML('beforeend', cardHtml);
    });
    // domUpdates.show(filledApple);
    // domUpdates.hide(emptyApple);
  },

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

  openRecipeInfo(recipe) {
    allRecipeCards.innerHTML += `
    <div class="recipe-instructions" id="fullRecipeInstructions">
    `;
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

  hideOrFillApple(event) {
    let emptyApple = document.querySelector('.card-apple-icon');
    let filledApple = document.querySelector('.filled-apple-icon ');
    // event.preventDefault();
    if(emptyApple) {
      domUpdates.show(filledApple);
      domUpdates.hide(emptyApple);
    } else if(filledApple) {
      domUpdates.hide(filledApple);
      domUpdates.show(emptyApple);
    }
  }

//  favoriteRecipe(event) {
//     event.preventDefault();
//     if (event.target.classList.contains('unfilled-heart')) {
//       show([filledHeart]);
//       hide([emptyHeart]);
//       const targetID = event.target.parentNode.parentNode.id;
//       const allRecipes = newRepository.recipesData;
//       const foundRecipe = allRecipes.find(
//         recipe => recipe.id === parseInt(targetID)
//       );
//       user.addToFavorites(foundRecipe);
//     }
//   }




};

export default domUpdates
