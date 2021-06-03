import { expect } from 'chai';
import Cookbook from '../src/cookbook'
import Recipe from '../src/recipe'
import { testIngredients, testRecipes, testUserData } from '../test/test-data';

describe('Cookbook', () => {
  let recipe1, recipe2, recipe3, testCookbook, allRecipes;

  beforeEach(() => {
    recipe1 = new Recipe(testRecipes[0], testIngredients);
    recipe2 = new Recipe(testRecipes[1], testIngredients);
    recipe3 = new Recipe(testRecipes[2], testIngredients);
    recipe1.updateEachRecipeIngredients(testIngredients);
    recipe2.updateEachRecipeIngredients(testIngredients);
    recipe3.updateEachRecipeIngredients(testIngredients);
    recipe1.returnIngredientNames(testIngredients);
    recipe2.returnIngredientNames(testIngredients);
    recipe3.returnIngredientNames(testIngredients);
    allRecipes = [recipe1, recipe2, recipe3];
    testCookbook = new Cookbook(allRecipes);
  });

  it('Should be a function', () => {
    expect(Cookbook).to.be.a('function');
  });

  it('should have a property to hold recipe data', () => {
    expect(testCookbook.cookbook).to.equal(testRecipes);
  });

  it('should have a way to store recipes that are filtered by tag', () => {
    expect(testCookbook).to.have.property('filteredByTag');
    expect(testCookbook.filteredByTag).to.deep.equal([]);
  });

  it('should have a way to store recipes that are filtered by name or ingredient', () => {
    expect(testCookbook).to.have.property('filteredByNameOrIngredient');
    expect(testCookbook.filteredByNameOrIngredient).to.deep.equal([]);
  });

  it('Should have a method that retrieves recipes by a tag', () => {
    testCookbook.filterByTag();
    expect(testCookbook.filterByTag).to.be.a('function')
  });

  it.skip('Should have a method that retrieves recipes by multiple tags', () => {
  });

  it.skip('Should be able to filter recipes by any ingredient', () => {
  });

  it.skip('Should be able to filter recipes by any name', () => {
  });

});
