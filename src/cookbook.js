class Cookbook {
  constructor(recipes) {
    this.cookbook = recipes;
  }


 findTags() {
  this.cookbook.reduce((acc, recipe) => {
    recipe.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc
  }, []);
}

findRecipesWithCheckedIngredients(selected) {
  let recipeChecker = (arr, target) => target.every(v => arr.includes(v));
  let ingredientNames = selected.map(item => {
    return item.id;
  })
  recipes.forEach(recipe => {
    let allRecipeIngredients = [];
    recipe.ingredients.forEach(ingredient => {
      allRecipeIngredients.push(ingredient.name);
    });
    if (!recipeChecker(allRecipeIngredients, ingredientNames)) {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = "none";
    }
  })
}


 findTaggedRecipes(selected) {
  let filteredResults = [];
  selected.forEach(tag => {
    let allRecipes = this.cookbook.filter(recipe => {
      return recipe.tags.includes(tag.id);
    });
    allRecipes.forEach(recipe => {
      if (!filteredResults.includes(recipe)) {
        filteredResults.push(recipe);
      }
    })
  });

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
      return recipe.name.toLowerCase().includes(searchInput.value.toLowerCase());
    });
    filterNonSearched(createRecipeObject(searchedRecipes));
  }

  }

};


export default Cookbook
