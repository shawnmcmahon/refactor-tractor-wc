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
let bannerText = document.getElementById('bannerText');
let filterRecipesBtn = document.getElementById('filterRecipesButton');
let favRecipesBtn = document.getElementById('myFavRecipesButton');
let homeBtn = document.getElementById('myHomeButton');
let myRecipesBanner = document.getElementById('myRecipesBanner');
let pantryBtn = document.getElementById('myPantryButton');
let recipesToCookBtn = document.getElementById('myRecipesToCookButton');
let searchBtn = document.getElementById('searchButton');
let searchInput = document.getElementById('searchInput');
let searchForm = document.getElementById('searchBar');
let whatCanIMakeBtn = document.getElementById('whatCanIMake');
let welcomeMessage = document.getElementById('welcomeMessage');

// variables
let user, cookbook, pantry;

//event listeners
window.onload = startUp();
favRecipesBtn.addEventListener('click', () => domUpdates.updateBanner(event));
recipesToCookBtn.addEventListener('click', () => domUpdates.updateBanner(event));
recipesToCookBtn.addEventListener('click', findCookList)
filterRecipesBtn.addEventListener('click', findCheckedTags);
pantryBtn.addEventListener('click', domUpdates.togglePantryMenu);
favRecipesBtn.addEventListener('click', findFavoriteRecipes);
searchForm.addEventListener('submit', () =>  pressEnterSearch(event));
searchBtn.addEventListener('click', searchRecipes);
homeBtn.addEventListener('click', () => domUpdates.renderRecipeCards(cookbook, user))
homeBtn.addEventListener('click', () => domUpdates.updateWelcomeMessage(user));
allRecipeCards.addEventListener('click', domUpdates.exitRecipe);
allRecipeCards.addEventListener('click', () => findIngredientsInPantry(event));
window.addEventListener('click', () => clickRecipeCard(event));

function startUp() {
  apiCalls.retrieveData()
    .then((promise) => {
      makeUserAndPantry(promise[0].usersData, promise[2].ingredientsData);
      const allRecipes = makeRecipeInstances(promise[1].recipeData, promise[2].ingredientsData);
      cookbook = new Cookbook(allRecipes, promise[2].ingredientsData);
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
  let eventTarget = event.target.closest('.card-photo-preview');
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