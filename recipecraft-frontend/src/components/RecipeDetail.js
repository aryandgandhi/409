// src/components/RecipeDetail.js

import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

function RecipeDetail({ recipe, goBack }) {
  if (!recipe) return null;

  return (
    <div className="container mt-4">
      <Button variant="secondary" onClick={goBack}>Back</Button>
      <h2 className="mt-3">{recipe.title}</h2>
      <h4>Ingredients</h4>
      <ListGroup>
        {recipe.ingredients.map((ingredient, index) => (
          <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>
        ))}
      </ListGroup>
      <h4 className="mt-3">Instructions</h4>
      <p>{recipe.instructions}</p>
    </div>
  );
}

export default RecipeDetail;
