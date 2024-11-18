// seed.js

const { faker } = require('@faker-js/faker');
const Recipe = require('./models');

async function seedDB() {
  try {
    await Recipe.deleteMany({});
    console.log('Old data removed');

    const recipes = [];

    for (let i = 0; i < 50; i++) {
      const newRecipe = {
        title: faker.lorem.words(),
        ingredients: faker.helpers.arrayElements(
          ['Chicken', 'Beef', 'Pork', 'Tofu', 'Rice', 'Pasta', 'Tomatoes', 'Cheese', 'Lettuce', 'Onions'],
          faker.number.int({ min: 3, max: 7 })
        ),
        instructions: faker.lorem.paragraphs(),
        nutrition: {
          calories: faker.number.int({ min: 200, max: 800 }),
          protein: faker.number.int({ min: 10, max: 50 }),
          carbs: faker.number.int({ min: 20, max: 100 }),
          fat: faker.number.int({ min: 5, max: 30 }),
        },
        dietaryPreferences: faker.helpers.arrayElements(
          ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo'],
          faker.number.int({ min: 0, max: 2 })
        ),
        substitutions: faker.helpers.arrayElements(
          ['Cauliflower Rice', 'Zucchini Noodles', 'Almond Milk', 'Coconut Oil'],
          faker.number.int({ min: 0, max: 3 })
        ),
      };

      recipes.push(newRecipe);
    }

    await Recipe.insertMany(recipes);
    console.log('Database seeded with fake data');
  } catch (err) {
    console.error('Error seeding the database:', err);
  } finally {
    // Close the connection after seeding
    process.exit();
  }
}

seedDB();
