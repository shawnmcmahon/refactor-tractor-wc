import Cookbook from './cookbook';

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }
  saveRecipe(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  removeRecipe(recipe) {
    let i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1);
  }

  decideToCook(recipe) {
    this.recipesToCook.push(recipe);
  }

  removeFromRecipesToCook(recipe) {
    const index = this.recipesToCook.indexOf(recipe);
    this.recipesToCook.splice(index, 1);
  }

  filterRecipes(type) {
    let favoriteRecipes = new Cookbook(this.favoriteRecipes);
    return favoriteRecipes.filterByTag(...tag);
    // return this.favoriteRecipes.filter(recipe => recipe.tags.includes(type));
  }

  searchForRecipe(ingredientsData, ...keyword) {
    let favoriteRecipes = new Cookbook(this.favoriteRecipes);
    return favoriteRecipes.filterByNameOrIngredient(ingredientsData, ...keyword)
    // return this.favoriteRecipes.filter(recipe => recipe.name.includes(keyword) || recipe.ingredients.includes(keyword));
  }






}

export default User;
