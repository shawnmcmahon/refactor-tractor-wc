/* eslint-disable max-len */
import { expect } from 'chai';
import Pantry from '../src/pantry';
import User from '../src/user';
import { testUserData, testRecipes, testIngredients} from '../test/test-data';
import Recipe from '../src/recipe';


describe.only('Pantry', () => {

  let pantry, pantry2, recipe1, recipe2, saige, ephraim;

  beforeEach(() => {
    saige = new User(testUserData[0])
    //ephraim = new User(testUserData[1]);
    pantry = new Pantry(saige, testIngredients);
    //pantry2 = new Pantry(ephraim, testIngredients);
    recipe1 = new Recipe(testRecipes[0], testIngredients)
    recipe2 = new Recipe(testRecipes[1], testIngredients)
  })

  it('is a function', function() {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', function() {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should have a way to hold pantry items', function () {
    expect(pantry.contents).to.eq(saige.pantry)
    //expect(pantry2.contents).to.eq(ephraim.pantry)
  });

  it('should return ALL information about pantry ingredients including name', function () {
    let answer = [
      {
        id: 0,
        name: 'rice',
        estimatedCostInCents: 150,
        ingredient: 0,
        amount: 4
      },
      {
        id: 1,
        name: 'egg',
        estimatedCostInCents: 10,
        ingredient: 1,
        amount: 10
      },
      {
        id: 2,
        name: 'avocado',
        estimatedCostInCents: 250,
        ingredient: 2,
        amount: 5
      }
    ];

    expect(pantry.returnPantryIngredients()).to.deep.eq(answer);
  });

  it('should determine whether the user has the ingredients to cook a recipe', () => {
    const canICook = pantry.canICookRecipe(recipe1);
    expect(canICook).to.equal('You have the ingredients in your pantry to cook this recipe!');
  });

  it('should tell the user what ingredients they still need if they cannot cook the recipe', () => {
    const canICook = pantry.canICookRecipe(recipe2);
    const stillNeed = [
      { id: 3, quantity: { amount: 3, unit: 'large' } },
      { id: 4, quantity: { amount: 1, unit: 'small' } },
      { id: 5, quantity: { amount: 5, unit: 'large' } },
      { id: 6, quantity: { amount: 1, unit: 'bunch' } }
    ];
    
    expect(canICook).to.deep.equal(stillNeed);

  })


  it.skip('should determine whether a pantry has enough ingredients to cook a recipe', function() {

    const canICook = pantry.haveAmountsPerRecipe(updatedRecipe);
    // console.log("test", canICook)
    expect(canICook).to.equal('You have enough of each ingredient to cook this recipe.');
    const iCantCook = pantry2.haveAmountsPerRecipe(updatedRecipe)
    console.log("cant", iCantCook)
    expect(iCantCook).to.equal('Sorry, you do not have the ingredients in your pantry to cook this recipe.');
  });


});
