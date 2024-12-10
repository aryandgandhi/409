import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeIdeas from './components/RecipeIdeas';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import Footer from './components/Footer';
import NavigationBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  // Whenever localStorage changes, update state
  useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedIn') === 'true');
  }, []);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <>
                <div className="container mt-4 text-center">
                  <h1>Welcome to RecipeCraft!</h1>
                  <p>Discover and add your favorite recipes.</p>
                  <div>
                    <button className="btn btn-success" onClick={() => setShowForm(true)}>
                      Add New Recipe
                    </button>
                  </div>
                </div>
                {!selectedRecipe && !showForm && (
                  <div className="container mt-5">
                    <h2>Recipes</h2>
                    <RecipeList selectRecipe={setSelectedRecipe} />
                  </div>
                )}
                {selectedRecipe && <RecipeDetail recipe={selectedRecipe} goBack={() => setSelectedRecipe(null)} />}
                {showForm && <RecipeForm addRecipe={() => setShowForm(false)} />}
              </>
            ) : (
              <div className="container mt-5 text-center">
                <h2>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link></h2>
              </div>
            )
          }
        />
        <Route path="/ideas" element={<RecipeIdeas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
