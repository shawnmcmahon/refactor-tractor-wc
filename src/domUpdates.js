/* eslint-disable max-len */
let fullRecipeInfo;

let domUpdates = {
  show(element) {
    element.classList.remove('hidden');
  },

  hide(element) {
    element.classList.add('hidden');
  },

  hideMany(elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },

  showMany(elements) {
    elements.forEach(element => element.classList.remove('hidden'));
  },

  updateWelcomeMessage(user) {
    let welcomeMessage = document.getElementById('welcomeMessage');
    let myRecipesBanner = document.getElementById('myRecipesBanner');
    let tagAside = document.getElementById('tagAside');
    let pantryAside = document.getElementById('pantryAside');
    let searchBar = document.getElementById('searchBar');

    this.hide(myRecipesBanner);
    this.show(welcomeMessage);
    this.show(tagAside);
    this.hide(pantryAside);
    this.show(searchBar);
    let firstName = user.name.split(' ')[0];
    welcomeMessage.innerHTML = `
        <h1>Welcome ${firstName}!</h1>
    `;
  },

  updateBanner(event) {
    let welcomeMessage = document.getElementById('welcomeMessage');
    let myRecipesBanner = document.getElementById('myRecipesBanner');
    let bannerText = document.getElementById('bannerText');
    let tagAside = document.getElementById('tagAside');
    let pantryAside = document.getElementById('pantryAside');
    let searchBar = document.getElementById('searchBar');

    this.hide(welcomeMessage);
    this.show(myRecipesBanner);

    let target = event.target.closest('button').id;

    if (target.includes('Fav')) {
      bannerText.innerText = 'My Favorite Recipes';
      this.show(tagAside);
      this.hide(pantryAside);
      this.show(searchBar);
    } else if (target.includes('Cook')) {
      bannerText.innerText = 'My Cooking Queue';
      this.hide(tagAside);
      this.show(pantryAside);
      this.hide(searchBar);
    }
  },

  updatePantryAside() {
    let pantrySearchResults = document.getElementById('pantrySearchResults');

    pantrySearchResults.innerHTML = `
    <h3>With your current pantry you can make: </h3>
    <ul>Pork Chops</ul>
    <h3>You need a few more things from the store to make these:</h3>
    <ul>Cookies- 2 eggs</ul>
    `;
  },

  listTags(allTags) {
    allTags.push('show all');
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
    let cardHtml;
    let recipes = cookbook.cookbook;
    allRecipeCards.innerHTML = '';
    recipes.forEach(recipe => {
      let name = domUpdates.shortenNames(recipe);

      if(user.favoriteRecipes.includes(recipe)) {
         cardHtml = `
        <div class='recipe-card' id=${recipe.id}>
          <h3>${name}</h3>
          <div class='card-photo-container'>
            <img src=${recipe.image} id=${recipe.id} class='card-photo-preview' alt='${recipe.name} recipe' title='${recipe.name} recipe'>
          </div>
          <h4>${recipe.tags[0]}</h4>
          <img src='../images/add-to-cook-queue-2.png' id=${recipe.id} alt="add to cook queue icon" class='card-silverware-icon'>
          <img src='../images/apple-logo.png' id=${recipe.id} alt='unfilled apple icon' class='card-apple-icon filled-apple-icon '>
        </div>`;
      } else {

       cardHtml = `
        <div class='recipe-card' id=${recipe.id}>
          <h3>${name}</h3>
          <div class='card-photo-container'>
            <img src=${recipe.image} id=${recipe.id} class='card-photo-preview' alt='${recipe.name} recipe' title='${recipe.name} recipe'>
          </div>
          <h4>${recipe.tags[0]}</h4>
          <img src='../images/add-to-cook-queue-2.png' id=${recipe.id} alt="add to cook queue icon" class='card-silverware-icon'>
          <img src='../images/apple-logo-outline.png' id=${recipe.id} alt='unfilled apple icon' class='card-apple-icon'>
        </div>`;
    }
        allRecipeCards.insertAdjacentHTML('beforeend', cardHtml);
    });
  },


  renderSearchResults(results) {
    let allRecipeCards = document.getElementById('allRecipeCards');
    let recipes = results;
    allRecipeCards.innerHTML = '';
    let cardHtml;

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
    // let addIngredientBtn = document.getElementById('add-ingredient');
    // let removeIngredientBtn = document.getElementById('remove-ingredient');


    let updatePantryIngs = pantry.returnPantryIngredients();

    updatePantryIngs.forEach(ingredient => {
      let ingredientHtml = `
      <li><input type='checkbox' class='pantry-checkbox' id='${ingredient.name}'>
          <label for='${ingredient.name}'>${ingredient.name}, ${ingredient.amount}</label></li>
          <button data-id='${ingredient.id}' id='${ingredient.id} add-ingredient' class='add-ingredient nav-button'>
            +
            </button>
            <button data-id='${ingredient.id}' id='${ingredient.id} remove-ingredient' class='remove-ingredient nav-button'>
            -
            </button>`;
      document
        .querySelector('.pantry-list')
        .insertAdjacentHTML('beforeend', ingredientHtml);
    });

    // this can be modified into the post request
    // let pantryCheckboxes = document.querySelectorAll('.pantry-checkbox');
    // pantryCheckboxes.forEach(checkbox => {
    //   checkbox.addEventListener('click', () => {
    //     domUpdates.findCheckedPantryBoxes('click');
    //   });
    // });
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
    domUpdates.generatePantryButton(recipe);
    fullRecipeInfo.insertAdjacentHTML(
      'beforebegin',
      '<section id="overlay"></div>'
    );
  },

  generateRecipeTitle(recipe) {
    let recipeTitle = `
      <button id='exit-recipe-btn'>X</button>
      <h3 id='recipe-title'>${recipe.name}</h3>
      <h4 id='${recipe.id}'>Ingredients</h4>
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

  generatePantryButton(recipe) {
    let ingSection = document.getElementById('ingredientsSection');
    let buttonHTML = `
      <button id="whatCanIMakeBtn" class="${recipe.id} show-pantry-recipes-btn">Can I Make This?</button>
        <section id="pantrySearchResults">
        </section>
    `;
    ingSection.insertAdjacentHTML('beforeend', buttonHTML);
  },

  displayCanICookResults(results, pantry) {
    let resultSection = document.getElementById('pantrySearchResults')
    if (pantry.hasIngredients && pantry.hasIngredientAmounts) {
      resultSection.innerText = 'You have everything you need to cook this recipe!'
    } else {
      resultSection.innerText = 'You are short on these ingredients:'
      results.forEach(item => {
        let html = `
        <ul>${item.name} - ${item.quantity.amount} ${item.quantity.unit}</ul>
        `;
        resultSection.insertAdjacentHTML('beforeend', html)
      })
    }
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
  }
};

export default domUpdates
