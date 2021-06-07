class Pantry {
  constructor(user, ingredients) {
    this.contents = user.pantry;
    this.hasIngredients = false;
    this.hasIngredientAmounts = false;
    this.ingredientsData = ingredients;
  }

  returnPantryIngredients() {
    let newObj;
    const matchedIngredients = this.contents.map(ingredient => {
      const foundIngredient = this.ingredientsData.find(data => {
        return data.id === ingredient.ingredient;
      });
      newObj = Object.assign(foundIngredient, ingredient);
      return newObj;

    });
    return matchedIngredients;
  }

  canICookRecipe(recipe) {
    let findIngs = recipe.ingredients.filter(ingredient => {
      let ids = this.contents.map(item => item.ingredient)
      if (ids.includes(ingredient.id)) {
        return ingredient
      }
    });

    if (findIngs.length === recipe.ingredients.length) {
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
      let newObj;
      const foundIngredient = this.ingredientsData.find(data => {
        return data.id === ingredient.id;
      });
      newObj = Object.assign(foundIngredient, ingredient);
      return newObj;
    });
    return goBuyThis;
  }
 
  haveAmountsPerRecipe(recipe) {
    
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

    if (whatINeed.length === 0) {
      this.hasIngredientAmounts = true;
      return []
    } else {
      const matchedIDs = whatINeed.map(ingredient => {
        const foundIngredient = this.ingredientsData.find(data => {
          return data.id === ingredient.id;
        });
        let newObj = Object.assign(foundIngredient, ingredient.quantity)
        return newObj;
      });
      return matchedIDs;
    }
  }
  
}

export default Pantry;

