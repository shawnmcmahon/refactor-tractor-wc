const testIngredients = [{
    "id": 0,
    "name": "rice",
    "estimatedCostInCents": 150
  },
  {
    "id": 1,
    "name": "egg",
    "estimatedCostInCents": 10
  },
  {
    "id": 2,
    "name": "avocado",
    "estimatedCostInCents": 250
  },
  {
    "id": 3,
    "name": "tomatillo",
    "estimatedCostInCents": 50
  },
  {
    "id": 4,
    "name": "garlic",
    "estimatedCostInCents": 25
  },
  {
    "id": 5,
    "name": "jalapeno",
    "estimatedCostInCents": 10
  },
  {
    "id": 6,
    "name": "cilantro",
    "estimatedCostInCents": 50
  },
  {
    "id": 7,
    "name": "soy sauce",
    "estimatedCostInCents": 5
  },
  {
    "id": 8,
    "name": "brown sugar",
    "estimatedCostInCents": 10
  }
]

const testRecipes = [{
    "id": 1,
    "image": "https://soufflebombay.com/wp-content/uploads/2017/01/Fried-Egg-Avocado-Rice-Bowl.jpg",
    "ingredients": [{
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
    ],
    "instructions": [{
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
    ],
    "name": "Rice bowl with Fried Egg",
    "tags": [
      "breakfast",
      "morning meal",
      "snack",
      "appetizer"
    ]
  },
  {
    "id": 2,
    "image": "https://i1.wp.com/www.wyldflour.com/wp-content/uploads/2017/05/Tomatillo-Avocado-Salsa-4.jpg",
    "ingredients": [{
        "id": 2,
        "quantity": {
          "amount": 2,
          "unit": "large"
        }
      },
      {
        "id": 3,
        "quantity": {
          "amount": 3,
          "unit": "large"
        }
      },
      {
        "id": 4,
        "quantity": {
          "amount": 1,
          "unit": "small"
        }
      },
      {
        "id": 5,
        "quantity": {
          "amount": 5,
          "unit": "large"
        }
      },
      {
        "id": 6,
        "quantity": {
          "amount": 1,
          "unit": "bunch"
        }
      }
    ],
    "instructions": [{
        "instruction": "Char tomatillos under a broiler or over an open flame. When toasted, place in a sealed bag or container to steam.",
        "number": 1
      },
      {
        "instruction": "Peel the tomatillos.",
        "number": 2
      },
      {
        "instruction": "In a blender or food processor, combine tomatillos, garlic, jalapeno, and cilantro and pulse into a coarse puree. Add avocado and pulse until smooth. Add small amounts of water as needed if the mixture thickens too much.",
        "number": 3
      },
      {
        "instruction": "Season with salt and pepper, and serve with lime wedges and tortilla chips.",
        "number": 4
      }
    ],
    "name": "Avocado and Tomatillo Salsa",
    "tags": [
      "snack",
      "appetizer"
    ]
  },
  {
    "id": 3,
    "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4409530.jpg&w=596&h=596&c=sc&poi=face&q=85",
    "ingredients": [{
        "id": 0,
        "quantity": {
          "amount": 2,
          "unit": "c"
        }
      },
      {
        "id": 1,
        "quantity": {
          "amount": 3,
          "unit": "large"
        }
      },
      {
        "id": 7,
        "quantity": {
          "amount": 1,
          "unit": "c"
        }
      },
      {
        "id": 8,
        "quantity": {
          "amount": 1,
          "unit": "c"
        }
      }
    ],
    "instructions": [{
        "instruction": "Cook rice.",
        "number": 1
      },
      {
        "instruction": "Combine 1 tablespoon of water with soy sauce and sugar and stir until sugar is dissolved.",
        "number": 2
      },
      {
        "instruction": "Add egg to mixture and beat until combined and the mixture is fluffy.",
        "number": 3
      },
      {
        "instruction": "Heat skillet over medium heat. Pour egg mixture into pan when warm, and cook until the egg mix has solidified, 3 - 5 minutes.",
        "number": 4
      },
      {
        "instruction": "Flip and fold omelet into a square and transfer to a plate. Serve with rice and garnish with desired herbs.",
        "number": 5
      }
    ],
    "name": "Tamagoyaki (Japanese Sweet Omelet)",
    "tags": [
      "breakfast",
      "morning meal",
      "snack",
      "appetizer"
    ]
  }
]

const testUserData = [{
    "name": "Saige O'Kon",
    "id": 1,
    "pantry": [{
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
    ]
  },
  {
    "name": "Ephraim Goyette",
    "id": 2,
    "pantry": [{
        "ingredient": 1,
        "amount": 3
      },
      {
        "ingredient": 2,
        "amount": 7
      },
      {
        "ingredient": 3,
        "amount": 8
      },
      {
        "ingredient": 4,
        "amount": 6
      },
      {
        "ingredient": 6,
        "amount": 10
      },
      {
        "ingredient": 8,
        "amount": 13
      }
    ]
  }

]


export {
  testIngredients,
  testRecipes,
  testUserData
};
