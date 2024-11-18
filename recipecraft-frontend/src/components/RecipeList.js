// src/components/RecipeList.js

import React, { useEffect, useState } from 'react';
import api from '../api';
import { Card, Button } from 'react-bootstrap';

function RecipeList({ selectRecipe }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get('/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Recipes</h2>
      <div className="row">
        {recipes.map(recipe => (
          <div className="col-md-4" key={recipe._id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>
                  {recipe.ingredients.slice(0, 3).join(', ')}...
                </Card.Text>
                <Button variant="primary" onClick={() => selectRecipe(recipe)}>
                  View Recipe
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
