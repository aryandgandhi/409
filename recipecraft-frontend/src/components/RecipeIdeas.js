// src/components/RecipeIdeas.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

function RecipeIdeas() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      setRecipes([...recipes, response.data.meals[0]]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipe ideas:', error);
      setLoading(false);
    }
  };

  const addAnotherRecipe = () => {
    fetchRecipes();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Recipe Ideas</h2>
      <p className="text-center">Discover random recipe ideas!</p>
      <div className="d-flex justify-content-center mb-4">
        <Button variant="primary" onClick={addAnotherRecipe}>
          Get Another Recipe
        </Button>
      </div>
      <div className="row">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          recipes.map((recipe, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <Card>
                <Card.Img
                  variant="top"
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                />
                <Card.Body>
                  <Card.Title>{recipe.strMeal}</Card.Title>
                  <Card.Text>
                    Category: {recipe.strCategory}
                    <br />
                    Cuisine: {recipe.strArea}
                  </Card.Text>
                  <a
                    href={recipe.strSource || recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    View Recipe
                  </a>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecipeIdeas;
