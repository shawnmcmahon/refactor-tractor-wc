import { expect } from 'chai';

import User from '../src/user';
import Recipe from '../src/Recipe'
import data from '../src/data/users-data';
//import { testIngredients, testRecipes, testUserData} from './test-data'
import testUserData from './sampleUserData';
import testRecipes from './sampleRecipesData'
import testIngredients from './sampleIngredientsData';

describe('User', function() {
  let user;
  let recipe;

  beforeEach(function() {

    user = new User(testUserData[0]);
    recipe = testRecipes[0];

  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceof(User);
  })

  it('should initialize with an id', function() {
    expect(user.id).to.eq(1);
  });

  it('should initialize with a name', function() {
    expect(user.name).to.eq('Saige O\'Kon');
  });

  it('should initialize with a pantry', function() {
    expect(user.pantry).to.eql([{
        "ingredient": 0,
        "amount": 4
      },
      {
        "ingredient": 1,
        "amount": 10
      },
      {
        "ingredient": 2,
        "amount": 5
      }
    ]);
  });

  it('should initialize with an empty favoriteRecipes array', function() {
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('should initialize with an empty recipesToCook array', function() {
    expect(user.recipesToCook).to.deep.equal([]);
  });

  it('should be able to save a recipe to favoriteRecipes', function() {
    user.saveRecipe(recipe);
    expect(user.favoriteRecipes[0].name).to.equal('Rice bowl with Fried Egg');
  });

  it('should be able to decide to cook a recipe', function() {
    user.decideToCook(recipe);
    user.removeFromRecipesToCook(recipe);
    expect(user.recipesToCook).to.eql([]);
  });

  it('should be able to filter recipes by type', function() {
    user.saveRecipe(recipe);
    const breakfastRecipes = user.filterRecipes('breakfast');
    expect(breakfastRecipes).to.deep.equal([recipe]);
  });

  it('should be able to search recipes by name', function() {
    user.saveRecipe(recipe);
    const recipeSearch = user.searchForRecipe(testIngredients, 'Egg', 'Rice');
    expect(recipeSearch).to.deep.equal([recipe]);
  });

  //Sad path testing
  it('Should not filter recipes that are missing a name', () => {
    const brokenRecipe = new Recipe(testRecipes[3], testIngredients)
    user.searchForRecipe(testIngredients, "banana")
    expect(user.favoriteRecipes).to.deep.equal([])
  })

  it('Should not filter recipes that are missing an id', () => {
    const brokenRecipe = new Recipe(testRecipes[3], testIngredients)
    user.searchForRecipe(testIngredients, "banana")
    expect(user.favoriteRecipes).to.deep.equal([])
  })

});
