import { expect } from 'chai';
import Cookbook from '../src/classes/Cookbook';
import { testIngredients, testRecipes, testUserData } from '../test/test-data';

describe('Cookbook', () => {

  beforeEach(() => {
   
  });

  it('Should be a function', () => {
    expect(Cookbook).to.be.a('function');
  });

  it('should have a property to hold recipe data', () => {
  });

  it('should have a way to store different lists of filtered recipes', () => {
  });

  it('Should have a method that retrieves recipes by a tag', () => {
  });

  it('Should have a method that retrieves recipes by multiple tags', () => {
  });

  it('Should be able to filter recipes by any ingredient', () => {
  });

  it('Should be able to filter recipes by any name', () => {
  });

});
