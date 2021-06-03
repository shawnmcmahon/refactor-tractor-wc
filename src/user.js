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
  filterRecipes(type) {
    return this.favoriteRecipes.filter(recipe => recipe.type.includes(type));
  }
  searchForRecipe(keyword) {
    return this.favoriteRecipes.filter(recipe => recipe.name.includes(keyword) || recipe.ingredients.includes(keyword));
  }

  //This should go in the User class method (add to my favorites)
  //This could definitely be broken down for more SRP code
  addToMyRecipes() {
    if (event.target.className === "card-apple-icon") {
      let cardId = parseInt(event.target.closest(".recipe-card").id)
      if (!user.favoriteRecipes.includes(cardId)) {
        event.target.src = "../images/apple-logo.png";
        user.saveRecipe(cardId);
      } else {
        event.target.src = "../images/apple-logo-outline.png";
        user.removeRecipe(cardId);
      }
    } else if (event.target.id === "exit-recipe-btn") {
      exitRecipe();
    } else if (isDescendant(event.target.closest(".recipe-card"), event.target)) {
      openRecipeInfo(event);
    }
  }

  showSavedRecipes() {
    let unsavedRecipes = recipes.filter(recipe => {
      return !user.favoriteRecipes.includes(recipe.id);
    });
    unsavedRecipes.forEach(recipe => {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = "none";
    });
    showMyRecipesBanner();
  }



}

export default User;
