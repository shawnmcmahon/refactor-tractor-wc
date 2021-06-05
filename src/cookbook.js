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

  filterByNameOrIngredient(ingredientsData, ...keywords) {
    console.log('the keywords', ...keywords)
    const seperatedKeywords = keywords.map(keyword => {
      console.log('the single keyword', keyword)
      return keyword.split(' ');
    }).flat();

    const lowerCaseKeyWords = seperatedKeywords.map(keyword => keyword.toLowerCase());
    const results = lowerCaseKeyWords.reduce((matchingRecipes, keyword) => {
    let foundIds = [];
    ingredientsData.forEach(ingredient => {
      if (ingredient.name) {
        if (ingredient.name.split(' ').includes(keyword)) {
          foundIds.push(ingredient.id)
        }
      }
    })
    this.cookbook.forEach(recipe => {
    let splitWords = recipe.name.toLowerCase().split(' ');
      if (splitWords.includes(keyword) && !matchingRecipes.includes(recipe)) {
        matchingRecipes.push(recipe);
      }

      recipe.ingredients.forEach(ingredient => {
        foundIds.forEach(id => {
          if (id === ingredient.id && !matchingRecipes.includes(recipe)) {
            matchingRecipes.push(recipe);
          }

        })
      })
    })
    console.log('matches', matchingRecipes[0])
    return matchingRecipes;
  }, [])
  //console.log('the result', results)
  this.filteredByNameOrIngredient = results;
  return results;
  }

  // filterByNameOrIngredient(inputs) {
  //   // input will likely be searchInput.value (searchBar.value?)
  //   // it will need to be an array of lowercase strings
  //   const filteredRecipes = inputs.reduce((acc, input) => {
  //     this.cookbook.forEach(recipe => {
  //       const recipeNames = recipe.name.toLowerCase();
  //       if (recipeNames.includes(input) && !acc.includes(recipe)) {
  //         acc.push(recipe);
  //       }
  //     });
  //
  //     this.cookbook.forEach(recipe => {
  //       const recipeIngredients = recipe.getIngredientNames();
  //       const splitIngredients = recipeIngredients
  //         .map(ingredient => ingredient.split(' '))
  //         .flat();
  //       if (splitIngredients.includes(input) && !acc.includes(recipe)) {
  //         acc.push(recipe);
  //       }
  //     });
  //
  //     return acc;
  //   }, []);
  //
  //   this.filteredByNameOrIngredient = filteredRecipes;
  // }

};

export default Cookbook
