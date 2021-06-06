class Cookbook {
  constructor(recipes, ingredients) {
    this.cookbook = recipes;
    this.filteredByTag = [];
    this.filteredByNameOrIngredient = [];
    this.ingredientsData = ingredients
  }

  // this is called inside of findCheckedBoxes
  filterByTag(...tags) {
    const lowerCaseTags = tags.map(tag => tag.toLowerCase());
    let results =  lowerCaseTags.reduce((matchingRecipes, tag) => {
      this.cookbook.forEach(recipe => {
        recipe.tags.forEach(currentTag => {
          if (tag === currentTag && !matchingRecipes.includes(recipe)) {
            matchingRecipes.push(recipe);
          }

        })
      })
      return matchingRecipes
    }, [])
    this.filteredByTag = results;
    return results
  }

  filterByNameOrIngredient(...keywords) {
    const separatedKeywords = keywords.map(keyword => {
      return keyword.split(' ');
    }).flat();
    const lowerCaseKeyWords = separatedKeywords.map(keyword =>
      keyword.toLowerCase()
    );
    const results = lowerCaseKeyWords.reduce((matchingRecipes, keyword) => {
      let foundIds = [];
      this.ingredientsData.forEach(ingredient => {
        if (ingredient.name) {
          if (ingredient.name.split(' ').includes(keyword)) {
            foundIds.push(ingredient.id)
          }
        }
      })
      this.cookbook.forEach(recipe => {
        let splitWords = recipe.name.toLowerCase().split(' ');
        if (splitWords.includes(keyword) && !matchingRecipes.includes(recipe) && recipe.name && recipe.id) {
          matchingRecipes.push(recipe);
        }

        recipe.ingredients.forEach(ingredient => {
          foundIds.forEach(id => {
            if (id === ingredient.id && !matchingRecipes.includes(recipe) && recipe.name && recipe.id) {
              matchingRecipes.push(recipe);
            }

          })
        })
      })

      return matchingRecipes;
    }, [])
    this.filteredByNameOrIngredient = results;
    return results;
  }


}

export default Cookbook
