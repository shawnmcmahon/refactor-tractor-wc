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
    // input is likely to be searchInput.value
    // may need to add toLowerCase
    const filteredRecipes = inputs.reduce((acc, item) => {
      this.recipesData.forEach(recipe => {
        const recipeNames = recipe.name.toLowerCase();
        if (recipeNames.includes(item) && !acc.includes(recipe)) {
          acc.push(recipe);
        }
      });

      this.recipesData.forEach(recipe => {
        const recipeIngredients = recipe.getIngredientNames();
        const splitIngredients = recipeIngredients
          .map(ingredient => ingredient.split(' '))
          .flat();
        if (splitIngredients.includes(item) && !acc.includes(recipe)) {
          acc.push(recipe);
        }
      });

      return acc;
    }, []);

    this.filteredByNameOrIngredient = filteredRecipes;
  }

};

export default Cookbook
