import { ingredientsData } from './data/ingredient-data';
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
    this.ingredientsData = getIngs;
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

export default Recipe;
