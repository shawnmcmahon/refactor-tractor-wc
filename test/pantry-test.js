 import { expect } from 'chai';
import Pantry from '../src/pantry';
import { testUserData, testRecipes, testIngredients} from '../test/test-data';
import Recipe from '../src/recipe';


describe.only('Pantry', () => {

  let pantry;
  let pantry2;
  let recipe;
  let recipe2;
  let updatedRecipe;
  let updatedRecipe2;


  beforeEach(function() {
    pantry = new Pantry(testUserData[0], testIngredients);
    pantry2 = new Pantry(testUserData[1], testIngredients)
    recipe = new Recipe(testRecipes[0], testIngredients)
    recipe2 = new Recipe(testRecipes[1], testIngredients)
    // updatedRecipe = recipe.getIngredients();
    // updatedRecipe2 = recipe2.getIngredients();
    // console.log("check", updatedRecipe)

    // console.log("recipe", recipe.ingredients)

    // console.log("pantry", pantry)

  })

  it('is a function', function() {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', function() {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should have a way to hold pantry items', function () {
    // console.log(testUserData[0])
    expect(pantry.contents).to.eq(testUserData[0].pantry)
    expect(pantry2.contents).to.eq(testUserData[1].pantry)
    // console.log("test", pantry.contents[0].ingredient)
  });

  it.only('should return pantry ingredients', function () {
    pantry.returnPantryIngredients();
    expect(pantry.contents).to.eq(testUserData[0].pantry)
  });

  it('should determine whether a pantry has the ingredients to cook a recipe', function() {

    const canICook = pantry.canICookRecipe(updatedRecipe);
    // console.log("test", canICook)
    expect(canICook).to.equal('You have the ingredients in your pantry to cook this recipe!');
    const iCantCook = pantry2.canICookRecipe(updatedRecipe)
    // console.log("cant", iCantCook)
    expect(iCantCook).to.equal('Sorry, you do not have the ingredients in your pantry to cook this recipe.');
    // expect(iCantCook).to.deep.equal([{ id: 0, quantity: { amount: 2, unit: 'c' }}]);
  });


  it('should determine whether a pantry has enough ingredients to cook a recipe', function() {

    const canICook = pantry.haveAmountsPerRecipe(updatedRecipe);
    // console.log("test", canICook)
    expect(canICook).to.equal('You have enough of each ingredient to cook this recipe.');
    const iCantCook = pantry2.haveAmountsPerRecipe(updatedRecipe)
    console.log("cant", iCantCook)
    expect(iCantCook).to.equal('Sorry, you do not have the ingredients in your pantry to cook this recipe.');
  });


});
