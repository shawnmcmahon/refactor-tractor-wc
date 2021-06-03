class Cookbook {
  constructor(recipes) {
    this.cookbook = recipes;
    this.filteredByTag = [];
    this.filteredByNameOrIngredient = [];
  }

  // this is called inside of findCheckedBoxes
  filterByTag(allCheckedTags) {
    let filteredRecipes = allCheckedTags.reduce((acc, tag) => {
      let matchingRecipe = this.cookbook.filter(recipe =>
        recipe.tags.includes(tag.id)
      );

      if (!acc.includes(matchingRecipe)) {
        acc.push(matchingRecipe);
      }

      return acc;
    }, []);

    // below is the previous logic, my refactor is above
    // allCheckedTags.forEach(tag => {

    //   let allRecipes = this.cookbook.filter(recipe => {
    //     return recipe.tags.includes(tag.id);
    //   });

    //   allRecipes.forEach(recipe => {
    //     if (!this.filteredByTag.includes(recipe)) {
    //       this.filteredByTag.push(recipe);
    //     }
    //   });

    // });
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
