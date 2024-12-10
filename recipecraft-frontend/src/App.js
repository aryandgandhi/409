// // src/App.js

// import React, { useState } from 'react';
// import RecipeList from './components/RecipeList';
// import NavigationBar from './components/NavBar';
// import RecipeDetail from './components/RecipeDetail';
// import RecipeForm from './components/RecipeForm';
// import Footer from './components/Footer';

// function App() {
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const addRecipe = recipe => {
//     setSelectedRecipe(recipe);
//     setShowForm(false);
//   };

//   const goBack = () => {
//     setSelectedRecipe(null);
//     setShowForm(false);
//   };

//   return (
//     <div>
 
//       <nav className="navbar navbar-dark bg-dark">
//         <span className="navbar-brand mb-0 h1">RecipeCraft</span>
//       </nav>

//       {!selectedRecipe && !showForm && (
//       <>
//         <div className="container mt-4">
//           <h1 className="text-center">Welcome to RecipeCraft!</h1>
//           <p className="text-center">
//             Discover, share, and manage your favorite recipes. Explore a wide variety of dishes or add your own recipes to the collection.
//           </p>
//         </div>
//         <button
//           className="btn btn-success mt-3 ml-3"
//           onClick={() => setShowForm(true)}
//         >
//           Add New Recipe
//         </button>
//         <RecipeList selectRecipe={setSelectedRecipe} />
//       </>
//     )}


//       {selectedRecipe && (
//         <RecipeDetail recipe={selectedRecipe} goBack={goBack} />
//       )}

//       {showForm && (
//         <RecipeForm addRecipe={addRecipe} />
//       )}
//       <Footer />
//     </div>
//   );
// }

// export default App;

// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeIdeas from './components/RecipeIdeas'; // New Component
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import Footer from './components/Footer';
import NavigationBar from './components/NavBar';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="container mt-4 text-center">
                <h1 className="text-center">Welcome to RecipeCraft!</h1>
                <p className="text-center">
                  Discover, share, and manage your favorite recipes. Explore a wide variety of dishes or add your own recipes to the collection.
                </p>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-success"
                    onClick={() => setShowForm(true)}
                  >
                    Add New Recipe
                  </button>
                </div>
              </div>
              {!selectedRecipe && !showForm && (
                <div className="container mt-5">
                  <h2 className="text-center">Recipes</h2>
                  <RecipeList selectRecipe={setSelectedRecipe} />
                </div>
              )}
              {selectedRecipe && (
                <RecipeDetail recipe={selectedRecipe} goBack={() => setSelectedRecipe(null)} />
              )}
              {showForm && (
                <RecipeForm addRecipe={() => setShowForm(false)} />
              )}
            </>
          }
        />
        <Route path="/ideas" element={<RecipeIdeas />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
