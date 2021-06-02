class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.image = recipe.image;
    this.tags = recipe.tags;
    this.ingredients = recipe.ingredients;
  }
  calculateIngredientsCost() {
    // return this.ingredients.map(i => {
    //   ingredientData.find(ingredient => ingredient === i);
    // });
  }

  //this should go in Recipe.js (returnIngredients)
  generateIngredients(recipe) {
    return recipe && recipe.ingredients.map(i => {
      return `${capitalize(i.name)} (${i.quantity.amount} ${i.quantity.unit})`
    }).join(", ");
  }

  generateInstructions(recipe) {
    let instructionsList = "";
    let instructions = recipe.instructions.map(i => {
      return i.instruction
    });
    instructions.forEach(i => {
      instructionsList += `<li>${i}</li>`
    });
    fullRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
    fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol>${instructionsList}</ol>`);
  }

}


export default Recipe;
