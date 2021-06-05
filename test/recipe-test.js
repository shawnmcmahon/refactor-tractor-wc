import { expect } from 'chai';
import Recipe from '../src/recipe';
// import { testRecipes, testIngredients } from '../test/test-data';
import testIngredients from './sampleIngredientsData'
import testRecipes from './sampleRecipesData'
import testUserData from './sampleUserData'

describe('Recipe', () => {

  let recipe;

  beforeEach(function() {
    recipe = new Recipe(testRecipes[0], testIngredients);

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

  it('should have access to ingredientsData', function() {
    expect(recipe.ingredientsData).to.eq(testIngredients);
  })


  it('should store instructions in an array', () => {
    expect(recipe.instructions).to.be.an('array');
  })


  it('should store recipe instructions', () => {
    expect(recipe.instructions).to.deep.equal([{
        "instruction": "Cook rice.",
        "number": 1
      },
      {
        "instruction": "Fry egg.",
        "number": 2
      },
      {
        "instruction": "Slice avocado.",
        "number": 3
      },
      {
        "instruction": "Once rice is cooked, scoop out desired portion into a bowl and top with egg and avocado slices. Garnish with chives and lime wedge.",
        "number": 4
      }
    ]);
  })

  //This currently works, but i had to edit the this.ingredientData property and
  //moved the methods of matching into a new function.
  //BUT i had to delete the API data name (ingData --> ingredientsData)
  //because our test data doesn't match that, and we need it to match so that we can access the api
  it('should update the ingredient data', () => {
    const getData = recipe.updateIngredientData(testIngredients)
    const ingredientInfo = [{
        id: 1,
        name: 'egg',
        estimatedCostInCents: 10
      },
      {
        id: 2,
        name: 'avocado',
        estimatedCostInCents: 250
      },
      {
        id: 3,
        name: 'tomatillo',
        estimatedCostInCents: 50
      },
      {
        id: 4,
        name: 'garlic',
        estimatedCostInCents: 25
      },
      {
        id: 5,
        name: 'jalapeno',
        estimatedCostInCents: 10
      },
      {
        id: 6,
        name: 'cilantro',
        estimatedCostInCents: 50
      },
      {
        id: 7,
        name: 'soy sauce',
        estimatedCostInCents: 5
      },
      {
        id: 8,
        name: 'brown sugar',
        estimatedCostInCents: 10
      }
    ]
    expect(recipe.ingredientsData).to.deep.equal(ingredientInfo);
  })

  it('should have a way to return all ingredient info needed', () => {
    const ingredients = recipe.getIngredients();
    const answer = [{
        id: 0,
        name: "rice",
        estimatedCostInCents: 150,
        quantity: {
          amount: 2,
          unit: 'c'
        }
      },
      {
        id: 1,
        name: "egg",
        estimatedCostInCents: 10,
        quantity: {
          amount: 1,
          unit: "large"
        }
      },
      {
        id: 2,
        name: "avocado",
        estimatedCostInCents: 250,
        quantity: {
          amount: 1,
          unit: "large"
        }
      }
    ]
    expect(ingredients).to.deep.equal(answer)
  })

  it('should be able to get the cost of the ingredients', () => {
    const cost = recipe.getRecipeCost();
    const answer = "$5.60"

    expect(cost).to.equal(answer)
  })

  it('should be able to get the names of the ingredients', () => {
    const getNames = recipe.getIngredientNames();
    expect(getNames).to.deep.equal(['rice', 'egg', 'avocado'])
  })

  it('should return the recipe instructions', () => {
    expect(recipe.returnInstructions()).to.deep.equal([{
        "instruction": "Cook rice.",
        "number": 1
      },
      {
        "instruction": "Fry egg.",
        "number": 2
      },
      {
        "instruction": "Slice avocado.",
        "number": 3
      },
      {
        "instruction": "Once rice is cooked, scoop out desired portion into a bowl and top with egg and avocado slices. Garnish with chives and lime wedge.",
        "number": 4
      }
    ]);
  })

  it('should return the recipe ingredient details', () => {
    expect(recipe.returnIngredients()).to.deep.equal([{
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
  })


  it('should start with ingredients Data in an array', () => {
    expect(recipe.ingredientsData).to.deep.equal(testIngredients);
  })

});
