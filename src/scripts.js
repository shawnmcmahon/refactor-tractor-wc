/* eslint-disable max-len */
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
let allRecipeCards = document.getElementById('allRecipeCards');
let filterRecipesBtn = document.getElementById('filterRecipesButton');
let favRecipesBtn = document.getElementById('myFavRecipesButton');
let homeBtn = document.getElementById('myHomeButton');
let myRecipesBanner = document.getElementById('myRecipesBanner');
let pantryBtn = document.getElementById('myPantryButton');
let recipesToCookBtn = document.getElementById('myRecipesToCookButton');
let searchBtn = document.getElementById('searchButton');
let searchInput = document.getElementById('searchInput');
let searchForm = document.getElementById('searchBar');

let addIngredientBtn = document.getElementById('add-ingredient');
let removeIngredientBtn = document.getElementById('remove-ingredient');
let pantryList = document.querySelector('.pantry-list')

// variables
let user, cookbook, pantry;

//event listeners
allRecipeCards.addEventListener('click', domUpdates.exitRecipe);
allRecipeCards.addEventListener('click', () => findIngredientsInPantry(event));
favRecipesBtn.addEventListener('click', () => domUpdates.updateBanner(event));
favRecipesBtn.addEventListener('click', findFavoriteRecipes);
filterRecipesBtn.addEventListener('click', findCheckedTags);
homeBtn.addEventListener('click', () => domUpdates.renderRecipeCards(cookbook, user))
homeBtn.addEventListener('click', () => domUpdates.updateWelcomeMessage(user));
pantryBtn.addEventListener('click', domUpdates.togglePantryMenu);
recipesToCookBtn.addEventListener('click', () => domUpdates.updateBanner(event));
recipesToCookBtn.addEventListener('click', findCookList)
searchForm.addEventListener('submit', () => pressEnterSearch(event));
searchBtn.addEventListener('click', searchRecipes);
window.addEventListener('click', () => clickRecipeCard(event));
window.onload = startUp();


pantryList.addEventListener('click', () => modifyIngredient(event, user))

function startUp() {
  apiCalls.retrieveData()
    .then((promise) => {
      makeUserAndPantry(promise[0], promise[2]);
      const allRecipes = makeRecipeInstances(promise[1], promise[2]);
      cookbook = new Cookbook(allRecipes, promise[2]);
      domUpdates.updateWelcomeMessage(user);
      getTagsFromRecipeData()
      domUpdates.renderRecipeCards(cookbook, user)
      domUpdates.displayPantryInfo(pantry)
    })
}

function makeUserAndPantry(apiUserData, apiIngredientData) {
  let randomNumber = Math.floor(Math.random() * apiUserData.length);
  user = new User(apiUserData[randomNumber], apiIngredientData);
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

function findFavoriteRecipes() {
  let favorites = user.favoriteRecipes
  domUpdates.renderFavorites(favorites, user)
}

function findCookList() {
  let cookList = user.recipesToCook;
  domUpdates.renderSearchResults(cookList, user)
}

function pressEnterSearch(event) {
  event.preventDefault();
  searchRecipes();
}

function amIOnTheHomePage() {
  if (myRecipesBanner.classList.contains('hidden')) {
    return true;
  } else {
    return false;
  }
}

function searchRecipes() {
  let input = [searchInput.value]
  searchInput.value = ''
  let homePage = amIOnTheHomePage();

  if (homePage) {
    let results = cookbook.filterByNameOrIngredient(input);
    domUpdates.renderSearchResults(results, user)
  } else if (!homePage) {
    let results = user.searchForRecipe(input)
    domUpdates.renderSearchResults(results, user)
  }
}

function findCheckedTags() {
  let tagCheckboxes = document.querySelectorAll('.checked-tag');
  let allTags = Array.from(tagCheckboxes)
  let selectedTags = allTags.filter(box => {
    return box.checked;
  }).map(checked => checked.id)

  allTags.forEach(box => box.checked = false)

  let homePage = amIOnTheHomePage();

  if (!homePage && !selectedTags.includes('show all')) {
    let results = user.filterRecipes(selectedTags);
    domUpdates.renderSearchResults(results, user);
  } else if (homePage && !selectedTags.includes('show all')) {
    let results = cookbook.filterByTag(selectedTags);
    domUpdates.renderSearchResults(results,user);
  } else if (!homePage && selectedTags.includes('show all')) {
    findFavoriteRecipes()
  } else if (homePage && selectedTags.includes('show all')) {
    domUpdates.renderRecipeCards(cookbook, user);
  }
}

function findIngredientsInPantry(event) {
  if (event.target.id === 'whatCanIMakeBtn') {
    let recipeId = event.target.classList[0];

    let matchedRecipe = cookbook.cookbook.find(recipe => {
      return parseInt(recipe.id) === parseInt(recipeId);
    });

    let results = pantry.canICookRecipe(matchedRecipe);
    domUpdates.displayCanICookResults(results, pantry)
  }
}

function clickRecipeCard(event) {
  clickApple(event);
  clickSilverware(event);
  getRecipeInfo(event);
}

function getRecipeInfo(event) {
  let eventTarget = event.target.closest('.card-photo-preview');
  if (event.target.closest('.card-photo-preview')) {
    const targetId = parseInt(eventTarget.id);
    const foundRecipe = cookbook.cookbook.find(
      recipe => targetId === recipe.id
    );
    domUpdates.openRecipeInfo(foundRecipe)
  }
}

function clickSilverware(event) {
  let eventSilverwareTarget = event.target.closest('.card-silverware-icon')
  if (eventSilverwareTarget) {
    let silverWareId = parseInt(eventSilverwareTarget.id);
    const foundRecipe = cookbook.cookbook.find(
      recipe => silverWareId === recipe.id
    );
    if (!user.recipesToCook.includes(foundRecipe)) {
      user.decideToCook(foundRecipe);
    } else {
      user.removeFromRecipesToCook(foundRecipe)
    }
  }
}

function clickApple(event) {
  let eventAppleTarget = event.target.closest('.card-apple-icon');
  if (eventAppleTarget) {
    let recipeId = parseInt(eventAppleTarget.id);
    const foundRecipe = cookbook.cookbook.find(
      recipe => recipeId === recipe.id
    );

    let cardId = parseInt(eventAppleTarget.id)
    if (!user.favoriteRecipes.includes(foundRecipe)) {
      const foundRecipe = cookbook.cookbook.find(
        recipe => cardId === recipe.id
      );
      event.target.src = "../images/apple-logo.png";
      user.saveRecipe(foundRecipe);
    } else {
      event.target.src = "../images/apple-logo-outline.png";
      const foundRecipe = cookbook.cookbook.find(
        recipe => cardId === recipe.id
      );
      user.removeRecipe(foundRecipe);
    }
  }
}

function modifyIngredient(event, user) {
  console.log(event.target.dataset.id)
  let addButton = event.target.closest('.add-ingredient')
  let removeButton = event.target.closest('.remove-ingredient')

  if (addButton) {
    apiCalls.addOrRemoveIngredient(user.id, event.target.dataset.id, 1, user)
      // .then(response => checkForError(response))
      .then(response => updatePantry(user.id, event.target.dataset.id, 1, user))
      // .catch(err => console.log(`POST Request Error: ${err.message}`))
  } else if (removeButton) {
    apiCalls.addOrRemoveIngredient(user.id, event.target.dataset.id, -1, user)
    // .then(response => checkForError(response))
    .then(response => updatePantry(user.id, event.target.dataset.id, -1, user))
    // .catch(err => console.log(`POST Request Error: ${err.message}`))
  }
}

export default function updatePantry(userID, ingredientID, ingredientMod, user) {
  console.log('user', user)

  let specificIngredient = user.pantry.findIndex(ingredient => {
    if (Number(ingredient.ingredient) === Number(ingredientID)) {
      return true
    }
  });
  console.log('specific ingredient', user.pantry[specificIngredient].amount )
  //console.log('ingredient mod', ingredientMod)
  //console.log(user.pantry)
  user.pantry[specificIngredient].amount += ingredientMod;


  //console.log("i'm here", user.pantry.contents[specificIngredient].amount )
  // domUpdates.displayPantry(user, globalIngredientsData);
}
