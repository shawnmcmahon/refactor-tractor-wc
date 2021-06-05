/* eslint-disable max-len */
import { expect } from 'chai';
import Pantry from '../src/pantry';
import User from '../src/user';
import { testUserData, testRecipes, testIngredients} from '../test/test-data';
import Recipe from '../src/recipe';


describe('Pantry', () => {

  let pantry, pantry2, recipe1, recipe2, saige, ephraim, pantry3, claire;

  beforeEach(() => {
    saige = new User(testUserData[0])
    ephraim = new User(testUserData[1]);
    pantry = new Pantry(saige, testIngredients);
    pantry2 = new Pantry(ephraim, testIngredients);
    recipe1 = new Recipe(testRecipes[0], testIngredients)
    recipe2 = new Recipe(testRecipes[1], testIngredients)
  })

  it('is a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should have a way to hold pantry items', () => {
    expect(pantry.contents).to.eq(saige.pantry)
    expect(pantry2.contents).to.eq(ephraim.pantry)
  });

  it('should have a way to keep track of whether a user has the necessary ingredients', () => {
    expect(pantry).to.have.a.property('hasIngredients');
  });

  it('should have a way to keep track of whether a user has the necessary ingredient amounts', () => {
    expect(pantry).to.have.a.property('hasIngredientAmounts');
  });

  it('should have a way to store ingredient data', () => {
    expect(pantry).to.have.a.property('ingredientsData');
    expect(pantry.ingredientsData).to.deep.equal(testIngredients)
  });

  it('should return ALL information about pantry ingredients including name', () => {
    let answer = [
      {
        id: 0,
        name: 'rice',
        estimatedCostInCents: 150,
        quantity: { amount: 2, unit: 'c' }
      },
      {
        id: 1,
        name: 'egg',
        estimatedCostInCents: 10,
        quantity: { amount: 3, unit: 'large' }
      },
      {
        id: 2,
        name: 'avocado',
        estimatedCostInCents: 250,
        quantity: { amount: 2, unit: 'large' }
      }
    ];

    let ingredients = pantry.returnPantryIngredients();

    expect(ingredients).to.deep.equal(answer);
  });

  it('should determine whether the user has the ingredients to cook a recipe', () => {
    pantry.canICookRecipe(recipe1);
    expect(pantry.hasIngredients).to.equal(true);
  });

  it('should tell the user what ingredients they still need if they cannot cook the recipe', () => {
    const canICook = pantry.canICookRecipe(recipe2);
    const ingredients = [
      {
        id: 3,
        name: 'tomatillo',
        estimatedCostInCents: 50,
        quantity: { amount: 3, unit: 'large' }
      },
      {
        id: 4,
        name: 'garlic',
        estimatedCostInCents: 25,
        quantity: { amount: 1, unit: 'small' }
      },
      {
        id: 5,
        name: 'jalapeno',
        estimatedCostInCents: 10,
        quantity: { amount: 5, unit: 'large' }
      },
      {
        id: 6,
        name: 'cilantro',
        estimatedCostInCents: 50,
        quantity: { amount: 1, unit: 'bunch' }
      }
    ];
    expect(canICook).to.deep.equal(ingredients)
  })

  it('should check that the user has all ingredients AND all amounts to make a recipe', () => {
    pantry.canICookRecipe(recipe1);
    expect(pantry.hasIngredients).to.equal(true);
    expect(pantry.hasIngredientAmounts).to.equal(true);
  });


  it.only("should return what amount of an ingredient the user needs if they don't have *enough* of an ingredient", () => {
    claire = new User(testUserData[2]);
    pantry3 = new Pantry(claire, testIngredients)
    let event = pantry3.canICookRecipe(recipe1)

    const whatINeed = [
      {
        id: 0,
        name: 'rice',
        estimatedCostInCents: 150,
        quantity: { amount: 1, unit: 'c' }
      }
    ];

    const whatINeed1 = [{ id: 0, quantity: { amount: 1, unit: 'c' }}];

    expect(pantry3.hasIngredients).to.equal(true);
    expect(pantry3.hasIngredientAmounts).to.equal(false)
    expect(event).to.deep.equal(whatINeed1)
  
  });


});
