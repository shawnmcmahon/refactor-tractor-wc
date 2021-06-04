class Pantry {
  constructor(user, ingredients) {
    this.contents = user.pantry;
    this.hasIngredients = false;
    this.hasIngredientAmounts = false;
    this.ingredientsData = ingredients;
  }

  returnPantryIngredients() {
    const matchedIngredients = this.contents.map(ingredient => {
      const foundIngredient = this.ingredientsData.find(
        data => {
          return data.id === ingredient.ingredient
        }
      );
      const newObj = Object.assign(foundIngredient, ingredient);
      return newObj
    });
    return matchedIngredients;
  }



  canICookRecipe(recipe) {
    let findIngs = recipe.ingredients.every((ingredient, i) =>
      this.contents[i].ingredient === ingredient.id)

    if (findIngs) {
      this.hasIngredients = true
      return "You have the ingredients in your pantry to cook this recipe!"
    } else {
      this.whatDoIStillNeed(recipe)
    }
  }

  whatDoIStillNeed(recipe) {
    let missing = this.contents.filter(ingredient => {
      recipe.ingredients.filter(ing => {
        return parseInt(ingredient.ingredient) !== parseInt(ing.id)
      })
    })
  }

  haveAmountsPerRecipe(recipe) {
    let hasIngs = this.canICookRecipe(recipe);
    let findAmounts;

    if (this.hasIngredients === true) {
      findAmounts = recipe.ingredients.every((ingredient, i) => {
        return this.contents[i].amount >= ingredient.quantity.amount
      })
    } else {
      return "Sorry, you do not have the ingredients in your pantry to cook this recipe."
    }

    if (findAmounts) {
      this.hasIngredientAmounts
      return "You have enough of each ingredient to cook this recipe."
    }
    // else {
    //   return "Sorry, you do not have the ingredients in your pantry to cook this recipe."
    // }
  }

}


export default Pantry;

//
//THIS IS ALL THE CODE FROM THE ORIGINAL FILE

//   let findIngs = recipe.ingredients.forEach((ingredient, i) => {
//     // console.log("allll", this.contents[i].ingredient)
//     if(ingredient.id === this.contents[i].ingredient){
//       return "Your pantry has all the recipe ingredients!"
//     }
//
//   })
// console.log("find", findIngs)
//   return findIngs
//
// }

//   this.pantry.forEach(ingredientItem => {
//     if(ingredientItem.id === )
//   }
//
//     item => {
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
// }

//
// }
//
//
// let pantryCheckboxes = document.querySelectorAll(".pantry-checkbox");
//
// function findCheckedPantryBoxes() {
//   // pantry-checkbox is inner html
//   let pantryCheckboxInfo = Array.from(pantryCheckboxes)
//   let selectedIngredients = pantryCheckboxInfo.filter(box => {
//     return box.checked;
//   })
//
//   showAllRecipes();
//   if (selectedIngredients.length > 0) {
//     findRecipesWithCheckedIngredients(selectedIngredients);
//   }
// }
//
//
//
// //dont think this is fully necessary, could probably just instantiate a pantry on load
// // seems like a really convoluted way to
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
//
//
// // CREATE AND USE PANTRY
//
//
// // Belongs in domUpdates
// function displayPantryInfo(pantry) {
//   pantry.forEach(ingredient => {
//     let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
//       <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
//     document.querySelector(".pantry-list").insertAdjacentHTML("beforeend",
//       ingredientHtml);
//   });
// }
//
//
// //is called inside findCheckedPantryBoxes
// //probably goes in cookbook class
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
//
// // Belongs in domUpdates
// function displayPantryInfo(pantry) {
//   pantry.forEach(ingredient => {
//     let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
//       <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
//     document.querySelector(".pantry-list").insertAdjacentHTML("beforeend",
//       ingredientHtml);
//   });
// }
