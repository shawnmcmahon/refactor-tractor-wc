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

  filterRecipes(...tag) {
    let favoriteRecipes = new Cookbook(this.favoriteRecipes);
    return favoriteRecipes.filterByTag(...tag);
  }

  searchForRecipe(ingredientsData, ...keyword) {
    let favoriteRecipes = new Cookbook(this.favoriteRecipes);
    return favoriteRecipes.filterByNameOrIngredient(ingredientsData, ...keyword);
  }






}

export default User;
