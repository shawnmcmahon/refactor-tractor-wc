/* eslint-disable max-len */
//imports
// import './css/base.scss';
// import './css/styles.scss';

import './css/index.scss';

import domUpdates from './domUpdates';
import apiCalls from './apiCalls'
import User from './user';
import Recipe from './recipe';
import Cookbook from './cookbook';
import Pantry from './pantry';
import './images/apple-logo-outline.png'
import './images/apple-logo.png'
import './images/chicken-parm.jpg'
import './images/cookbook.png'
import './images/green-apples.jpg'
import './images/pancakes.jpg'
import './images/search.png'
import './images/seasoning.png'
import './images/spoon.png'
import './images/add-to-cook-queue.png'
import './images/add-to-cook-queue-2.png'
import './images/remove-from-cook-queue.png'
import './images/home.png'

// query selectors
let pantryBtn = document.getElementById('myPantryButton');
let savedRecipesBtn = document.getElementById('myFavRecipesButton');
let searchBtn = document.getElementById('searchButton');
let searchInput = document.getElementById('searchInput');
let allRecipesBtn = document.getElementById('showAllRecipesButton');
let showPantryRecipes = document.getElementById('whatCanIMake');
let searchForm = document.getElementById('searchBar');
let filterRecipesBtn = document.getElementById('filterRecipesButton')
// let exitBtn = document.getElementById('exit-recipe-btn')
let tagList = document.getElementById('tagList')
let recipeSection = document.getElementById('fullRecipeInstructions')
let homeBtn = document.getElementById('myHomeButton')
let allRecipeCards = document.getElementById('allRecipeCards');
// variables
let user, cookbook, pantry;
let globalIngredientsData = {};

//event listeners
window.onload = startUp()
filterRecipesBtn.addEventListener('click', findCheckedTags);
//showPantryRecipes.addEventListener('click', domUpdates.findCheckedPantryBoxes);
pantryBtn.addEventListener('click', domUpdates.togglePantryMenu);
savedRecipesBtn.addEventListener('click', findFavoriteRecipes);
window.addEventListener('click', () => clickRecipeCard(event));
searchForm.addEventListener('submit', () =>  pressEnterSearch(event));
searchBtn.addEventListener('click', searchRecipes);
recipeSection.addEventListener('click', domUpdates.exitRecipe);
allRecipesBtn.addEventListener('click', () => domUpdates.renderRecipeCards(cookbook, user))
allRecipesBtn.addEventListener('click', domUpdates.toggleBannerText)
homeBtn.addEventListener('click', () => domUpdates.renderRecipeCards(cookbook, user))
allRecipeCards.addEventListener('click', domUpdates.exitRecipe);
// exitBtn.addEventListener('click', domUpdates.exitRecipe)
// main.addEventListener('click', addToMyRecipes);
// allRecipesBtn.addEventListener('click', showAllRecipes);
// showPantryRecipes.addEventListener('click', findCheckedPantryBoxes);

function startUp() {
  apiCalls.retrieveData()
    .then((promise) => {
      makeUserInstance(promise[0].usersData, promise[2].ingredientsData);
      const allRecipes = makeRecipeInstances(promise[1].recipeData, promise[2].ingredientsData);
      cookbook = new Cookbook(allRecipes, promise[2].ingredientsData);
      globalIngredientsData = promise[2].ingredientsData
      domUpdates.updateWelcomeMessage(user);
      getTagsFromRecipeData()
      domUpdates.renderRecipeCards(cookbook, user)
      domUpdates.displayPantryInfo(pantry)
    })

}

function makeUserInstance(apiUserData, apiIngredientData) {
  let randomNumber = Math.floor(Math.random() * apiUserData.length);
  user = new User(apiUserData[randomNumber], apiIngredientData);
  makePantryInstance(user, apiIngredientData)
}

function makePantryInstance(user, apiIngredientData) {
  pantry = new Pantry(user, apiIngredientData)
}


function makeRecipeInstances(apiRecipeData, apiIngredientData) {
  const newRecipes = apiRecipeData.map(recipe => {
    return new Recipe(recipe, apiIngredientData)
  })
  return newRecipes
}

function getTagsFromRecipeData() {
  const tags = cookbook.cookbook.reduce((allTags, recipe) => {
    recipe.tags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
    return allTags.sort();
  }, []);
  domUpdates.listTags(tags);
}

function clickRecipeCard(event) {
  let eventTarget = event.target.closest('.card-photo-preview');
  if (eventTarget) {
    const targetId = parseInt(eventTarget.id);
    const foundRecipe = cookbook.cookbook.find(
      recipe => targetId === recipe.id
    );
    domUpdates.openRecipeInfo(foundRecipe)
  }
}


function findFavoriteRecipes() {
  let favorites = user.favoriteRecipes
  domUpdates.renderSearchResults(favorites)
  //need to get banner text to show when you are viewing favorites
  domUpdates.toggleBannerText()

}

function pressEnterSearch(event) {
  event.preventDefault();
  searchRecipes();
}

function searchRecipes() {
  let input = searchInput.value
  let results = cookbook.filterByNameOrIngredient(input);
  domUpdates.renderSearchResults(results)
  domUpdates.toggleBannerText()
  searchInput.value = ''
}


///////////// everything above this line is not total garbage /////////////


//this is for pantry class
// this function is fired off inside of findCheckedPantryBoxes
// selected is an array of pantryCheckboxes (whatever that means)
function findRecipesWithCheckedIngredients(selected) {
  let recipeChecker = (arr, target) => target.every(v => arr.includes(v));
  let ingredientNames = selected.map(item => {
    return item.id;
  });
  recipes.forEach(recipe => {
    let allRecipeIngredients = [];
    recipe.ingredients.forEach(ingredient => {
      allRecipeIngredients.push(ingredient.name);
    });
    if (!recipeChecker(allRecipeIngredients, ingredientNames)) {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = 'none';
    }
  });
}

function findCheckedTags() {
  let tagCheckboxes = document.querySelectorAll('.checked-tag');
  let allTags = Array.from(tagCheckboxes)
  let selectedTags = allTags.filter(box => {
    return box.checked;
  }).map(checked => checked.id)
  let results = cookbook.filterByTag(selectedTags);
  domUpdates.renderSearchResults(results)
}


//This might not be needed if we can find a way that html just generates the recipes that have been searched
function filterNonSearched(filtered) {
  let found = recipes.filter(recipe => {
    let ids = filtered.map(f => f.id);
    return !ids.includes(recipe.id)
  })
  hideUnselectedRecipes(found);
}


//dont think this is fully necessary, could probably just instantiate a pantry on load
// seems like a really convoluted way to
// function findPantryInfo() {
//   //seems like a weird way to match ids and ingredients, should go in recipe class maybe?
//   // in any case, ingredientsData is hardcoded atm and we will fetch
//   user.pantry.forEach(item => {
//     let itemInfo = ingredientsData.find(ingredient => {
//       return ingredient.id === item.ingredient;
//     });
//     let originalIngredient = pantryInfo.find(ingredient => {
//       if (itemInfo) {
//         return ingredient.name === itemInfo.name;
//       }
//     });
//     if (itemInfo && originalIngredient) {
//       originalIngredient.count += item.amount;
//     } else if (itemInfo) {
//       pantryInfo.push({name: itemInfo.name, count: item.amount});
//     }
//   });
//   // wtf is localeCompare
//   // why would we need to sort pantry
//   displayPantryInfo(pantryInfo.sort((a, b) => a.name.localeCompare(b.name)));
// }





///////////////// OLD GARBAGE HERE vvv

// FILTER BY RECIPE TAGS
// Belongs in CookBook.
// Moved to cookbook
// function findTags() {
//   let tags = [];
//   recipeData.forEach(recipe => {
//     recipe.tags.forEach(tag => {
//       if (!tags.includes(tag)) {
//         tags.push(tag);
//       }
//     });
//   });
//   tags.sort();
//   listTags(tags);
// }



// Move to dom Updates
  // let welcomeMsg = `
  //   <div class='welcome-msg'>
  //     <h1>Welcome ${firstName}!</h1>
  //   </div>`;
  // document.querySelector('.banner-image').insertAdjacentHTML('afterbegin',
  //   welcomeMsg);


//this is the filter by tags that should go in Cookbook.js
// renamed filterByTag!!!!
// function filterByTag(selected) {
//   let filteredResults = [];
//   selected.forEach(tag => {
//     let allRecipes = recipes.filter(recipe => {
//       return recipe.tags.includes(tag.id);
//     });
//     allRecipes.forEach(recipe => {
//       if (!filteredResults.includes(recipe)) {
//         filteredResults.push(recipe);
//       }
//     })
//   });


// this used to be called by showAllRecipes(), it's probably not needed
//
// function filterRecipes(filtered) {
//   let foundRecipes = recipes.filter(recipe => {
//     return !filtered.includes(recipe);
//   });
//   //this should go to domUpdates
//   hideUnselectedRecipes(foundRecipes)
// }

//this should go in domUpdates
//This could potentially be deleted if not necessary
//
// function hideUnselectedRecipes(foundRecipes) {
//   foundRecipes.forEach(recipe => {
//     let domRecipe = document.getElementById(`${recipe.id}`);
//     domRecipe.style.display = 'none';
//   });
// }

// FAVORITE RECIPE FUNCTIONALITY

//This should go in the User class method (add to my favorites)
//This could definitely be broken down for more SRP code
function addToMyRecipes() {
  if (event.target.className === 'card-apple-icon') {
    let cardId = parseInt(event.target.closest('.recipe-card').id)
    if (!user.favoriteRecipes.includes(cardId)) {
      event.target.src = '../images/apple-logo.png';
      user.saveRecipe(cardId);
    } else {
      event.target.src = '../images/apple-logo-outline.png';
      user.removeRecipe(cardId);
    }
  }

  else if (event.target.id === 'exit-recipe-btn') {
    exitRecipe();
  } else if (isDescendant(event.target.closest('.recipe-card'), event.target)) {
    openRecipeInfo(event);
  }
}

//Is this domUpdates?
//delete this?? It is used in addToMyRecipes which is in User
// function isDescendant(parent, child) {
//   let node = child;
//   while (node !== null) {
//     if (node === parent) {
//       return true;
//     }
//     node = node.parentNode;
//   }
//   return false;
// }

//This is part User.js (filterFavoriteRecipes) and part domUpdates to show those recipes
// function showSavedRecipes() {
//   let unsavedRecipes = recipes.filter(recipe => {
//     return !user.favoriteRecipes.includes(recipe.id);
//   });
//   unsavedRecipes.forEach(recipe => {
//     let domRecipe = document.getElementById(`${recipe.id}`);
//     domRecipe.style.display = 'none';
//   });
//   showMyRecipesBanner();
// }

// CREATE RECIPE INSTRUCTIONS

//Remove CSS styling from JS?
//domUpdates function
// function openRecipeInfo(event) {
//   fullRecipeInfo.style.display = 'inline';
//   let recipeId = event.path.find(e => e.id).id;
//   let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
//   generateRecipeTitle(recipe, generateIngredients(recipe));
//   addRecipeImage(recipe);
//   generateInstructions(recipe);
//   fullRecipeInfo.insertAdjacentHTML('beforebegin', '<section id='overlay'></div>');
// }

//This should go in the domUpdates
// function generateRecipeTitle(recipe, ingredients) {
//   let recipeTitle = `
//     <button id='exit-recipe-btn'>X</button>
//     <h3 id='recipe-title'>${recipe.name}</h3>
//     <h4>Ingredients</h4>
//     <p>${ingredients}</p>`
//   fullRecipeInfo.insertAdjacentHTML('beforeend', recipeTitle);
// }

//This should go in the domUpdates
// function addRecipeImage(recipe) {
//   document.getElementById('recipe-title').style.backgroundImage = `url(${recipe.image})`;
// }


// //this should go in Recipe.js (returnIngredients)
// function generateIngredients(recipe) {
//   return recipe && recipe.ingredients.map(i => {
//     return `${capitalize(i.name)} (${i.quantity.amount} ${i.quantity.unit})`
//   }).join(', ');
// }

//This should go in Recipe.js (return Instructions) for the first half
//This bottom part should be in domUpdates
// function generateInstructions(recipe) {
//   let instructionsList = '';
//   let instructions = recipe.instructions.map(i => {
//     return i.instruction
//   });
//   instructions.forEach(i => {
//     instructionsList += `<li>${i}</li>`
//   });
//   fullRecipeInfo.insertAdjacentHTML('beforeend', '<h4>Instructions</h4>');
//   fullRecipeInfo.insertAdjacentHTML('beforeend', `<ol>${instructionsList}</ol>`);
// }

//This should go to domUpdates
// function exitRecipe() {
//   while (fullRecipeInfo.firstChild &&
//     fullRecipeInfo.removeChild(fullRecipeInfo.firstChild));
//   fullRecipeInfo.style.display = 'none';
//   document.getElementById('overlay').remove();
// }

// TOGGLE DISPLAYS

// //This goes in domUpdates
// function showMyRecipesBanner() {
//   document.querySelector('.welcome-msg').style.display = 'none';
//   document.querySelector('.my-recipes-banner').style.display = 'block';
// }
//
// // Belongs in domUpdates
// function showWelcomeBanner() {
//   document.querySelector('.welcome-msg').style.display = 'flex';
//   document.querySelector('.my-recipes-banner').style.display = 'none';
// }



// Belongs in domUpdates
//  Is this needed? Is there a better way to do this?
// function toggleMenu() {
//   var menuDropdown = document.querySelector('.drop-menu');
//   menuOpen = !menuOpen;
//   if (menuOpen) {
//     menuDropdown.style.display = 'block';
//   } else {
//     menuDropdown.style.display = 'none';
//   }
// }

//dom manipulation
// seems an odd way to display recipes
// function showAllRecipes() {
//   recipes.forEach(recipe => {
//     let domRecipe = document.getElementById(`${recipe.id}`);
//     domRecipe.style.display = 'block';
//   });
//   showWelcomeBanner();
// }

// CREATE AND USE PANTRY


// Belongs in domUpdates
// function displayPantryInfo(pantry) {
//   pantry.forEach(ingredient => {
//     let ingredientHtml = `<li><input type='checkbox' class='pantry-checkbox' id='${ingredient.name}'>
//       <label for='${ingredient.name}'>${ingredient.name}, ${ingredient.count}</label></li>`;
//     document.querySelector('.pantry-list').insertAdjacentHTML('beforeend',
//       ingredientHtml);
//   });
// }


//is called inside findCheckedPantryBoxes
//probably goes in cookbook class
// function findRecipesWithCheckedIngredients(selected) {
//   let recipeChecker = (arr, target) => target.every(v => arr.includes(v));
//   let ingredientNames = selected.map(item => {
//     return item.id;
//   })
//   recipes.forEach(recipe => {
//     let allRecipeIngredients = [];
//     recipe.ingredients.forEach(ingredient => {
//       allRecipeIngredients.push(ingredient.name);
//     });
//     if (!recipeChecker(allRecipeIngredients, ingredientNames)) {
//       let domRecipe = document.getElementById(`${recipe.id}`);
//       domRecipe.style.display = 'none';
//     }
//   })
// }
