 import { expect } from 'chai';
import Pantry from '../src/pantry';
import { testUserData } from '../test/test-data';


describe.only('Pantry', () => {

  let pantry;
  let pantry2;

  beforeEach(function() {
    pantry = new Pantry(testUserData[0]);
    pantry2 = new Pantry(testUserData[1])

  })

  it('is a function', function() {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', function() {
    expect(pantry).to.be.an.instanceof(Pantry);
  });



 
});
