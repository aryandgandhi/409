// src/App.js

import React, { useState } from 'react';
import RecipeList from './components/RecipeList';
import NavigationBar from './components/NavBar';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import Footer from './components/Footer';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const addRecipe = recipe => {
    setSelectedRecipe(recipe);
    setShowForm(false);
  };

  const goBack = () => {
    setSelectedRecipe(null);
    setShowForm(false);
  };

  return (
    <div>
 
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">RecipeCraft</span>
      </nav>

      {!selectedRecipe && !showForm && (
        <>
          <button
            className="btn btn-success mt-3 ml-3"
            onClick={() => setShowForm(true)}
          >
            Add New Recipe
          </button>
          <RecipeList selectRecipe={setSelectedRecipe} />
        </>
      )}

      {selectedRecipe && (
        <RecipeDetail recipe={selectedRecipe} goBack={goBack} />
      )}

      {showForm && (
        <RecipeForm addRecipe={addRecipe} />
      )}
      <Footer />
    </div>
  );
}

export default App;
