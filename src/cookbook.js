class Cookbook {
  constructor(recipes) {
    this.cookbook = recipes;
    this.filteredByTag = [];
    this.filteredByNameOrIngredient = [];
  }

  // this is called inside of findCheckedBoxes
  filterByTag(allCheckedTags) {
    let filteredRecipes = allCheckedTags.reduce((acc, tag) => {
      let matchingRecipe = this.cookbook.filter(recipe => recipe.tags.includes(tag.id));

      if (!acc.includes(matchingRecipe)) {
        acc.push(matchingRecipe)
      }
      
      return acc
    }, [])

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

  filterRecipes(filtered) {
    let foundRecipes = this.cookbook.filter(recipe => {
      return !filtered.includes(recipe);
    });
    //this should go to domUpdates
    // hideUnselectedRecipes(foundRecipes)
  }

  //should be called filterByName
  searchRecipes() {
    showAllRecipes();
    let searchedRecipes = recipeData.filter(recipe => {
      return recipe.name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase());
    });
    filterNonSearched(createRecipeObject(searchedRecipes));
  }
};

export default Cookbook
