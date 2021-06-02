import {
  expect
} from 'chai';

import Recipe from '../src/recipe';

import {
  testRecipes,
  testRecipeData,
  testIngredients
} from '../test/test-data';

describe('Recipe', () => {
  let recipe;
  // let recipeInfo;

  beforeEach(function() {
    // recipeInfo = data.recipeData[0];
    recipe = new Recipe(testRecipes[0]);
  })

  it('is a function', function() {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should initialize with an id', function() {
    expect(recipe.id).to.eq(1);
  });

  it('should initialize with an name', function() {
    expect(recipe.name).to.eq('Rice bowl with Fried Egg');
  });

  it('should initialize with an image', function() {
    expect(recipe.image).to.eq('https://soufflebombay.com/wp-content/uploads/2017/01/Fried-Egg-Avocado-Rice-Bowl.jpg');
  });

  it('should initialize with an array of ingredients', function() {
    expect(recipe.ingredients).to.deep.eq([{
        "id": 0,
        "quantity": {
          "amount": 2,
          "unit": "c"
        }
      },
      {
        "id": 1,
        "quantity": {
          "amount": 1,
          "unit": "large"
        }
      },
      {
        "id": 2,
        "quantity": {
          "amount": 1,
          "unit": "large"
        }
      }
    ]);
  });

  it('should store recipe tags', function() {
    expect(recipe.tags).to.deep.equal([
      "breakfast",
      "morning meal",
      "snack",
      "appetizer"
    ]);
  })
  it.only('should store ingredient names in an array', function() {
    expect(recipe.ingredientNames).to.be.an('array');
  })

  it('should start with no ingredient names in an array', function() {
    expect(recipe.ingredientNames).to.deep.equal([]);
  })

  it('should calculate the total cost of all of the ingredients', function() {
    expect(recipe.calculateIngredientsCost()).to.eq();
  });
});
