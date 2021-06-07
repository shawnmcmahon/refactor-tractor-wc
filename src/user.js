import Cookbook from './cookbook';

class User {
  constructor(user, ingredients) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.ingredientsData = ingredients;
    this.isViewingFavorites = false;
    this.isViewingRecipesToCook = false;
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

  filterRecipes(tag) {
    let favoriteRecipes = new Cookbook(this.favoriteRecipes, this.ingredientsData);
    return favoriteRecipes.filterByTag(tag);
  }

  searchForRecipe(keyword) {
    let favoriteRecipes = new Cookbook(this.favoriteRecipes, this.ingredientsData);
    return favoriteRecipes.filterByNameOrIngredient(keyword);
  }

  viewFavorites() {
    this.isViewingFavorites = true;
    this.isViewingRecipesToCook = false;
  }

  viewCookBook() {
    this.isViewingFavorites = false;
    this.isViewingRecipesToCook = true;
  }

  viewHome() {
    this.isViewingFavorites = false;
    this.isViewingRecipesToCook = false;
  }







}

export default User;
