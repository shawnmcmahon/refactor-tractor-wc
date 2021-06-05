class Pantry {
  constructor(user, ingredients) {
    this.contents = user.pantry;
    this.hasIngredients = false;
    this.hasIngredientAmounts = false;
    this.ingredientsData = ingredients;
  }

  returnPantryIngredients() {
    const matchedIngredients = this.contents.map(ingredient => {
      const foundIngredient = this.ingredientsData.find(data => {
        return data.id === ingredient.ingredient;
      });
      return foundIngredient
    });
    return matchedIngredients;
  }

  canICookRecipe(recipe) {
    let findIngs = recipe.ingredients.every((ingredient, i) => {
      return this.contents[i].ingredient === ingredient.id;
    });

    if (findIngs) {
      this.hasIngredients = true;
      return this.haveAmountsPerRecipe(recipe);
    } else {
      return this.whatDoIStillNeed(recipe);
    }
  }

  whatDoIStillNeed(recipe) {
    let pantryIngredientsById = this.contents.map(
      ingredient => ingredient.ingredient
    );

    let ingredientsINeed = recipe.ingredients.reduce((acc, ingredient) => {
      let ingredientsIHave = pantryIngredientsById.filter(
        id => id === ingredient.id
      );
      if (!ingredientsIHave.includes(ingredient.id)) {
        acc.push(ingredient);
      }
      return acc;
    }, []);

    const goBuyThis = ingredientsINeed.map(ingredient => {
      const foundIngredient = this.ingredientsData.find(data => {
        return data.id === ingredient.id;
      });
      return foundIngredient
    });
    return goBuyThis;
  
  }
 
  haveAmountsPerRecipe(recipe) {
    let findAmounts;

    if (this.hasIngredients) {
      findAmounts = recipe.ingredients.every((ingredient, i) => {
        return this.contents[i].amount >= ingredient.quantity.amount;
      });
    }

    if (findAmounts) {
      return this.hasIngredientAmounts = true;
    } else {
      let whatINeed = []
      recipe.ingredients.map(ingredient => {
        this.contents.forEach(item => {
          if (
            item.ingredient === ingredient.id &&
            ingredient.quantity.amount - item.amount > 0
          ) {
            whatINeed.push({
              id: item.ingredient,
              quantity: {
                amount: ingredient.quantity.amount - item.amount,
                unit: ingredient.quantity.unit
              }  
            });
          }
        })
      })

      const matchedIDs = whatINeed.map(ingredient => {
        const foundIngredient = this.ingredientsData.find(data => {
          return data.id === ingredient.id;
        });
        let newObj = Object.assign(foundIngredient, ingredient)
        return newObj;
      });
      return matchedIDs;
    }
  }
}

export default Pantry;

//haveAmountsPerRecipe
//render to the DOM!!!
// let howMuch = hasIngs.map(ing => {
//   return `Sorry, you need ${ing.quantity.amount} ${ing.quantity.unit} of ${ing.name}.`;
// });