class Cookbook {
  constructor(recipes) {
    this.cookbook = recipes;
    this.filteredByTag = [];
    this.filteredByNameOrIngredient = [];
  }

  // this is called inside of findCheckedBoxes
  filterByTag(allCheckedTags) {
    let filteredRecipes = allCheckedTags.reduce((acc, tag) => {
      let matchingRecipes = this.cookbook.filter(recipe => {
        return recipe.tags.includes(tag);
      }).forEach(matchingRecipe => {
        if (!acc.includes(matchingRecipe)) {
          acc.push(matchingRecipe);
        }
      })

      return acc.flat();
    }, []);
    
    this.filteredByTag = filteredRecipes 
  }

  filterByNameOrIngredient(inputs) {
    // input will likely be searchInput.value (searchBar.value?)
    // it will need to be an array of lowercase strings 
    const filteredRecipes = inputs.reduce((acc, input) => {
      this.cookbook.forEach(recipe => {
        const recipeNames = recipe.name.toLowerCase();
        if (recipeNames.includes(input) && !acc.includes(recipe)) {
          acc.push(recipe);
        }
      });

      this.cookbook.forEach(recipe => {
        const recipeIngredients = recipe.getIngredientNames();
        const splitIngredients = recipeIngredients
          .map(ingredient => ingredient.split(' '))
          .flat();
        if (splitIngredients.includes(input) && !acc.includes(recipe)) {
          acc.push(recipe);
        }
      });

      return acc;
    }, []);

    this.filteredByNameOrIngredient = filteredRecipes;
  }

};

export default Cookbook
