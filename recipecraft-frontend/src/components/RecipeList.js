// // src/components/RecipeList.js

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Form, Card, Button } from 'react-bootstrap';

// function RecipeList({ selectRecipe }) {
//   const [recipes, setRecipes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredRecipes, setFilteredRecipes] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5002/recipes')
//       .then(response => {
//         setRecipes(response.data);
//         setFilteredRecipes(response.data); // Initialize filtered recipes
//       })
//       .catch(error => console.error(error));
//   }, []);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     // Filter recipes based on the search term
//     const filtered = recipes.filter(recipe =>
//       recipe.title.toLowerCase().includes(value)
//     );
//     setFilteredRecipes(filtered);
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Recipes</h2>
//       <Form.Group className="mb-3" controlId="searchRecipes">
//         <Form.Control
//           type="text"
//           placeholder="Search recipes by title..."
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </Form.Group>

//       <div className="row">
//         {filteredRecipes.map(recipe => (
//           <div className="col-md-4" key={recipe._id}>
//             <Card className="mb-4">
//               <Card.Body>
//                 <Card.Title>{recipe.title}</Card.Title>
//                 <Card.Text>
//                   {recipe.ingredients.slice(0, 3).join(', ')}...
//                 </Card.Text>
//                 <Button variant="primary" onClick={() => selectRecipe(recipe)}>
//                   View Recipe
//                 </Button>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RecipeList;

// src/components/RecipeList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { Form, Card, Button } from 'react-bootstrap';

function RecipeList({ selectRecipe }) {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Fetch recipes on component mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch recipes from the backend
  const fetchRecipes = () => {
    axios.get('http://localhost:5002/recipes')
      .then(response => {
        setRecipes(response.data);
        setFilteredRecipes(response.data); // Initialize filtered recipes
      })
      .catch(error => console.error(error));
  };

  // Delete a recipe by ID
  const deleteRecipe = (id) => {
    axios.delete(`http://localhost:5002/recipes/${id}`)
      .then(() => {
        // Update the recipes state by removing the deleted recipe
        const updatedRecipes = recipes.filter(recipe => recipe._id !== id);
        setRecipes(updatedRecipes);

        // Update the filteredRecipes state based on the new recipes list and search term
        const updatedFilteredRecipes = updatedRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(searchTerm)
        );
        setFilteredRecipes(updatedFilteredRecipes);
      })
      .catch(error => console.error(error));
  };

  // Handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter recipes based on the search term
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(value)
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div className="container mt-4">
      <h2>Recipes</h2>
      <Form.Group className="mb-3" controlId="searchRecipes">
        <Form.Control
          type="text"
          placeholder="Search recipes by title..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>

      <div className="row">
        {filteredRecipes.map(recipe => (
          <div className="col-md-4" key={recipe._id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>
                  {recipe.ingredients.slice(0, 3).join(', ')}...
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => selectRecipe(recipe)}
                  className="me-2"
                >
                  View Recipe
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteRecipe(recipe._id)}
                >
                  Delete
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

