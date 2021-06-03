import {
  ingredientsData
} from './data/ingredient-data';


class Recipe {
  constructor(recipe, ingredientsData) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.tags = recipe.tags;
    this.instructions = recipe.instructions;
    this.ingredientsData = ingredientsData

  }

  updateIngredientData() {
    const getIngs = this.ingredientsData.filter(ingredient => ingredient.name && ingredient.id);
    this.ingredientsData = getIngs
  }

  getIngredients() {
    const matchedIngredients = this.ingredients.map(ingredient => {
      const foundIngredient = this.ingredientsData.find(
        data => data.id === ingredient.id
      );
      const newObj = Object.assign(foundIngredient, ingredient);
      return newObj
    });
    return matchedIngredients;
  }

  getRecipeCost() {
    const ingredients = this.getIngredients();

    const total = ingredients.reduce((acc, item) => {
      acc += item.quantity.amount * item.estimatedCostInCents;
      return acc;
    }, 0);

    const costInDollars = (total / 100).toFixed(2);
    return `$${costInDollars}`;
  }

  getIngredientNames() {
    const matchedIngredients = this.ingredients.map(ingredient => {
      const foundIngredient = this.ingredientsData.find(
        data => data.id === ingredient.id
      );
      const newObj = Object.assign(foundIngredient, ingredient);
      console.log("obj", newObj)
      return newObj.name
    });
    return matchedIngredients;
  }

  returnInstructions() {
    return this.instructions;
  }

  returnIngredients() {
    return this.ingredients
  }


}



// A Recipe represents one recipe object.
//
// It should hold on to all its information (provided in the data file).
// It should have methods to:
// Determine the names of ingredients needed
// Get the cost of its ingredients
// Return its directions / instructions


//   calculateIngredientsCost() {
//     // return this.ingredients.map(i => {
//     //   ingredientData.find(ingredient => ingredient === i);
//     // });
//   }
//
//   //this should go in Recipe.js (returnIngredients)
//   generateIngredients(recipe) {
//     return recipe && recipe.ingredients.map(i => {
//       return `${capitalize(i.name)} (${i.quantity.amount} ${i.quantity.unit})`
//     }).join(", ");
//   }
//
//   generateInstructions(recipe) {
//     let instructionsList = "";
//     let instructions = recipe.instructions.map(i => {
//       return i.instruction
//     });
//     instructions.forEach(i => {
//       instructionsList += `<li>${i}</li>`
//     });
//     fullRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
//     fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol>${instructionsList}</ol>`);
//   }
//
// }


export default Recipe;
