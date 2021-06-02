import { expect } from 'chai';
import Cookbook from '../src/cookbook'
import { testIngredients, testRecipes, testUserData } from '../test/test-data';

describe('Cookbook', () => {
let cookbook;

  beforeEach(() => {
    cookbook = new Cookbook(testRecipes)
  });

  it('Should be a function', () => {
    expect(Cookbook).to.be.a('function');
  });

  it('should have a property to hold recipe data', () => {
    expect(cookbook.cookbook).to.equal(testRecipes);
  });

  it('should have a way to store recipes that are filtered by tag', () => {
    expect(cookbook).to.have.property('filteredByTag');
    expect(cookbook.filteredByTag).to.deep.equal([]);
  });

  it('should have a way to store recipes that are filtered by name or ingredient', () => {
    expect(cookbook).to.have.property('filteredByNameOrIngredient');
    expect(cookbook.filteredByNameOrIngredient).to.deep.equal([]);
  });

  it.skip('Should have a method that retrieves recipes by a tag', () => {
  });

  it.skip('Should have a method that retrieves recipes by multiple tags', () => {
  });

  it.skip('Should be able to filter recipes by any ingredient', () => {
  });

  it.skip('Should be able to filter recipes by any name', () => {
  });

});
