//imports
import users from './data/users-data';
import recipeData from  './data/recipe-data';
import ingredientData from './data/ingredient-data';
import './css/base.scss';
import './css/styles.scss';
import domUpdates from './domUpdates';

import User from './user';
import Recipe from './recipe';
import Cookbook from './cookbook';
import './images/apple-logo-outline.png'
import './images/apple-logo.png'
import './images/chicken-parm.jpg'
import './images/cookbook.png'
import './images/green-apples.jpg'
import './images/pancakes.jpg'
import './images/search.png'
import './images/seasoning.png'

// query selectors
let main = document.querySelector("main");

let allRecipesBtn = document.getElementById('showAllRecipesButton');
let filterBtn = document.getElementById('filterRecipesButton');
let pantryBtn = document.getElementById('myPantryButton');
let savedRecipesBtn = document.getElementById('myFavRecipesButton');
let searchBtn = document.getElementById('searchButton');
let showPantryRecipes = document.getElementById('whatCanIMake');
let searchForm = document.getElementById('searchBar');
// these are now used in DOM only vvv
let fullRecipeInfo = document.getElementById('fullRecipeInstructions');
let searchInput = document.getElementById('searchInput');
let tagList = document.getElementById('tagList');

// variables
//do we want to name our other instances here?
let user;
let pantryInfo = [];
let recipes = [];
let menuOpen = false;

//event listeners
window.addEventListener("load", generateUser);
filterBtn.addEventListener("click", findCheckedBoxes);
showPantryRecipes.addEventListener("click", findCheckedPantryBoxes);
searchForm.addEventListener("submit", pressEnterSearch);

// all functions below were moved into class files
window.addEventListener("load", createCards);
window.addEventListener("load", findTags);
allRecipesBtn.addEventListener("click", showAllRecipes);
main.addEventListener("click", addToMyRecipes);
pantryBtn.addEventListener("click", toggleMenu);
savedRecipesBtn.addEventListener("click", showSavedRecipes);
searchBtn.addEventListener("click", searchRecipes);
showPantryRecipes.addEventListener("click", findCheckedPantryBoxes);
searchForm.addEventListener('submit', pressEnterSearch);

// GENERATE A USER ON LOAD
// Stay in Scripts.js. Generate the user when we call the promise in the startup
// function
function generateUser() {
  user = new User(users[Math.floor(Math.random() * users.length)]);
  findPantryInfo();
  domUpdates.updateWelcomeMessage(user);

    // find pantry info on load, could probably just create a new instance of pantry

 //findTags function runs on pageload
  //creates a list of all tags in the cookbook
  //should maybe sort them
  //then calls listTags and passes it the array of tags
  // listTags renders all the tags to the DOM (inserting them into the <ul class="tag-list">)
  findTags() {
    this.cookbook.reduce((acc, recipe) => {
      recipe.tags.forEach(tag => {
        if (!recipe.tags.includes(tag)) {
          acc.push(tag);
        }
      });
      return acc;
    }, []);
  }

function findCheckedPantryBoxes() {
  // pantry-checkbox is inner html
  let pantryCheckboxes = document.querySelectorAll(".pantry-checkbox");
  let pantryCheckboxInfo = Array.from(pantryCheckboxes)
  let selectedIngredients = pantryCheckboxInfo.filter(box => {
    return box.checked;
  })

  showAllRecipes();
  if (selectedIngredients.length > 0) {
    findRecipesWithCheckedIngredients(selectedIngredients);
  }
}

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


// Capitalize?? Why not lowercase?
function capitalize(words) {
  return words.split(" ").map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}

//Stay in scripts
function findCheckedBoxes() {
  let tagCheckboxes = document.querySelectorAll(".checked-tag");
  // pretty sure we can delete Array.from() since querySelectorAll returns an array
  //let checkboxInfo = Array.from(tagCheckboxes)
  let selectedTags = tagCheckboxes.filter(box => {
    return box.checked;
  })
  cookbook.filterByTag(selectedTags);
}

// this will be scripts. However, there is a better way to do.
function pressEnterSearch(event) {
  event.preventDefault();
  searchRecipes();
}

//This might not be needed if we can find a way that html just generates the recipes that have been searched
function filterNonSearched(filtered) {
  let found = recipes.filter(recipe => {
    let ids = filtered.map(f => f.id);
    return !ids.includes(recipe.id)
  })
  hideUnselectedRecipes(found);
}

//This stays in scripts, though it could be adjusted to be called on laod ?
function createRecipeObject(recipes) {
  recipes = recipes.map(recipe => new Recipe(recipe));
  return recipes
}

//dont think this is fully necessary, could probably just instantiate a pantry on load
// seems like a really convoluted way to
function findPantryInfo() {
  //seems like a weird way to match ids and ingredients, should go in recipe class maybe?
  // in any case, ingredientsData is hardcoded atm and we will fetch
  user.pantry.forEach(item => {
    let itemInfo = ingredientsData.find(ingredient => {
      return ingredient.id === item.ingredient;
    });
    let originalIngredient = pantryInfo.find(ingredient => {
      if (itemInfo) {
        return ingredient.name === itemInfo.name;
      }
    });
    if (itemInfo && originalIngredient) {
      originalIngredient.count += item.amount;
    } else if (itemInfo) {
      pantryInfo.push({name: itemInfo.name, count: item.amount});
    }
  });
  // wtf is localeCompare
  // why would we need to sort pantry
  displayPantryInfo(pantryInfo.sort((a, b) => a.name.localeCompare(b.name)));
}





///////////////// OLD GARBAGE HERE vvv
// CREATE RECIPE CARDS
// Belongs inside domUpdates
// function createCards() {
//   recipeData.forEach(recipe => {
//     let recipeInfo = new Recipe(recipe);
// // Why are they shortening the name of the recipe? Is this necessary? Probably not
// //
//     let shortRecipeName = recipeInfo.name;
//     recipes.push(recipeInfo);
//     if (recipeInfo.name.length > 40) {
//       shortRecipeName = recipeInfo.name.substring(0, 40) + "...";
//     }
// // Neeed to move addToDom to domUpdates
//     addToDom(recipeInfo, shortRecipeName)
//   });
// }

// Belongs in domUpdates
// function addToDom(recipeInfo, shortRecipeName) {
//   let cardHtml = `
//     <div class="recipe-card" id=${recipeInfo.id}>
//       <h3 maxlength="40">${shortRecipeName}</h3>
//       <div class="card-photo-container">
//         <img src=${recipeInfo.image} class="card-photo-preview" alt="${recipeInfo.name} recipe" title="${recipeInfo.name} recipe">
//         <div class="text">
//           <div>Click for Instructions</div>
//         </div>
//       </div>
//       <h4>${recipeInfo.tags[0]}</h4>
//       <img src="../images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
//     </div>`
// // Should NEVER be inserting html into Main. Find another, better HTML tag to insert into
//   main.insertAdjacentHTML("beforeend", cardHtml);
// }

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

//Belongs in domUpdates
// function listTags(allTags) {
//   allTags.forEach(tag => {
//     let tagHtml = `<li><input type="checkbox" class="checked-tag" id="${tag}">
//       <label for="${tag}">${capitalize(tag)}</label></li>`;
//     tagList.insertAdjacentHTML("beforeend", tagHtml);
//   });
// }

// Move to dom Updates
  // let welcomeMsg = `
  //   <div class="welcome-msg">
  //     <h1>Welcome ${firstName}!</h1>
  //   </div>`;
  // document.querySelector(".banner-image").insertAdjacentHTML("afterbegin",
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
//     domRecipe.style.display = "none";
//   });
// }

// FAVORITE RECIPE FUNCTIONALITY

//This should go in the User class method (add to my favorites)
//This could definitely be broken down for more SRP code
// function addToMyRecipes() {
//   if (event.target.className === "card-apple-icon") {
//     let cardId = parseInt(event.target.closest(".recipe-card").id)
//     if (!user.favoriteRecipes.includes(cardId)) {
//       event.target.src = "../images/apple-logo.png";
//       user.saveRecipe(cardId);
//     } else {
//       event.target.src = "../images/apple-logo-outline.png";
//       user.removeRecipe(cardId);
//     }
//   } else if (event.target.id === "exit-recipe-btn") {
//     exitRecipe();
//   } else if (isDescendant(event.target.closest(".recipe-card"), event.target)) {
//     openRecipeInfo(event);
//   }
// }

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
//     domRecipe.style.display = "none";
//   });
//   showMyRecipesBanner();
// }

// CREATE RECIPE INSTRUCTIONS

//Remove CSS styling from JS?
//domUpdates function
// function openRecipeInfo(event) {
//   fullRecipeInfo.style.display = "inline";
//   let recipeId = event.path.find(e => e.id).id;
//   let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
//   generateRecipeTitle(recipe, generateIngredients(recipe));
//   addRecipeImage(recipe);
//   generateInstructions(recipe);
//   fullRecipeInfo.insertAdjacentHTML("beforebegin", "<section id='overlay'></div>");
// }

//This should go in the domUpdates
// function generateRecipeTitle(recipe, ingredients) {
//   let recipeTitle = `
//     <button id="exit-recipe-btn">X</button>
//     <h3 id="recipe-title">${recipe.name}</h3>
//     <h4>Ingredients</h4>
//     <p>${ingredients}</p>`
//   fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
// }

//This should go in the domUpdates
// function addRecipeImage(recipe) {
//   document.getElementById("recipe-title").style.backgroundImage = `url(${recipe.image})`;
// }


// //this should go in Recipe.js (returnIngredients)
// function generateIngredients(recipe) {
//   return recipe && recipe.ingredients.map(i => {
//     return `${capitalize(i.name)} (${i.quantity.amount} ${i.quantity.unit})`
//   }).join(", ");
// }

//This should go in Recipe.js (return Instructions) for the first half
//This bottom part should be in domUpdates
// function generateInstructions(recipe) {
//   let instructionsList = "";
//   let instructions = recipe.instructions.map(i => {
//     return i.instruction
//   });
//   instructions.forEach(i => {
//     instructionsList += `<li>${i}</li>`
//   });
//   fullRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
//   fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol>${instructionsList}</ol>`);
// }

//This should go to domUpdates
// function exitRecipe() {
//   while (fullRecipeInfo.firstChild &&
//     fullRecipeInfo.removeChild(fullRecipeInfo.firstChild));
//   fullRecipeInfo.style.display = "none";
//   document.getElementById("overlay").remove();
// }

// TOGGLE DISPLAYS

// //This goes in domUpdates
// function showMyRecipesBanner() {
//   document.querySelector(".welcome-msg").style.display = "none";
//   document.querySelector(".my-recipes-banner").style.display = "block";
// }
//
// // Belongs in domUpdates
// function showWelcomeBanner() {
//   document.querySelector(".welcome-msg").style.display = "flex";
//   document.querySelector(".my-recipes-banner").style.display = "none";
// }


// This should go in the Cookbook class (filter by name)
// this function really sucked, I made a new method in cookbook class called filterByNameOrIngredient

// function searchRecipes() {
//   showAllRecipes();
//   let searchedRecipes = recipeData.filter(recipe => {
//     return recipe.name.toLowerCase().includes(searchInput.value.toLowerCase());
//   });
//   filterNonSearched(createRecipeObject(searchedRecipes));
// }



// Belongs in domUpdates
//  Is this needed? Is there a better way to do this?
// function toggleMenu() {
//   var menuDropdown = document.querySelector(".drop-menu");
//   menuOpen = !menuOpen;
//   if (menuOpen) {
//     menuDropdown.style.display = "block";
//   } else {
//     menuDropdown.style.display = "none";
//   }
// }

//dom manipulation
// seems an odd way to display recipes
// function showAllRecipes() {
//   recipes.forEach(recipe => {
//     let domRecipe = document.getElementById(`${recipe.id}`);
//     domRecipe.style.display = "block";
//   });
//   showWelcomeBanner();
// }

// CREATE AND USE PANTRY


// Belongs in domUpdates
// function displayPantryInfo(pantry) {
//   pantry.forEach(ingredient => {
//     let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
//       <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
//     document.querySelector(".pantry-list").insertAdjacentHTML("beforeend",
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
//       domRecipe.style.display = "none";
//     }
//   })
// }
