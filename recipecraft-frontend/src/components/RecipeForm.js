// src/components/RecipeForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function RecipeForm({ addRecipe }) {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.split(',').map(ing => ing.trim()),
    };

    axios.post('http://localhost:3000/recipes', newRecipe)
      .then(response => {
        addRecipe(response.data);
        setRecipe({ title: '', ingredients: '', instructions: '' });
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container mt-4">
      <h2>Add a New Recipe</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={recipe.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formIngredients">
          <Form.Label>Ingredients (comma-separated)</Form.Label>
          <Form.Control
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formInstructions">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Recipe
        </Button>
      </Form>
    </div>
  );
}

export default RecipeForm;