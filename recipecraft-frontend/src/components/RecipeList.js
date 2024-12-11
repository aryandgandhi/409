// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Assuming you're using axios for HTTP requests
// import { Form, Card, Button } from 'react-bootstrap';

// function RecipeList({ selectRecipe }) {
//   const [recipes, setRecipes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredRecipes, setFilteredRecipes] = useState([]);

//   // Fetch recipes on component mount
//   useEffect(() => {
//     fetchRecipes();
//   }, []);

//   // Fetch recipes from the backend
//   const fetchRecipes = () => {
//     axios.get('https://four09-backend-ejlu.onrender.com/recipes')
//       .then(response => {
//         setRecipes(response.data);
//         setFilteredRecipes(response.data); // Initialize filtered recipes
//       })
//       .catch(error => console.error(error));
//   };

//   // Delete a recipe by ID
//   const deleteRecipe = (id) => {
//     axios.delete(`https://four09-backend-ejlu.onrender.com/recipes/${id}`)
//       .then(() => {
//         // Update the recipes state by removing the deleted recipe
//         const updatedRecipes = recipes.filter(recipe => recipe._id !== id);
//         setRecipes(updatedRecipes);

//         // Update the filteredRecipes state based on the new recipes list and search term
//         const updatedFilteredRecipes = updatedRecipes.filter(recipe =>
//           recipe.title.toLowerCase().includes(searchTerm)
//         );
//         setFilteredRecipes(updatedFilteredRecipes);
//       })
//       .catch(error => console.error(error));
//   };

//   // Handle search input changes
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
//                 <Button
//                   variant="primary"
//                   onClick={() => selectRecipe(recipe)}
//                   className="me-2"
//                 >
//                   View Recipe
//                 </Button>
//                 <Button
//                   variant="danger"
//                   onClick={() => deleteRecipe(recipe._id)}
//                 >
//                   Delete
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

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For HTTP requests
import { Form, Card, Button } from 'react-bootstrap';

function RecipeList({ selectRecipe }) {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [apiRecipe, setApiRecipe] = useState(null); // Store the external API recipe

  // Fetch user recipes on component mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch user recipes from the backend
  const fetchRecipes = () => {
    axios.get('https://four09-backend-ejlu.onrender.com/recipes')
      .then(response => {
        setRecipes(response.data);
        setFilteredRecipes(response.data); // Initialize filtered recipes
      })
      .catch(error => console.error('Error fetching user recipes:', error));
  };

  // Fetch a recipe from Recipe Puppy based on the search term
  const fetchApiRecipe = (term) => {
    if (!term) return; // Skip if no search term

    axios.get('http://www.recipepuppy.com/api/', {
      params: { q: term }, // Use the search term
    })
      .then(response => {
        if (response.data.results && response.data.results.length > 0) {
          const recipe = response.data.results[0];
          const formattedRecipe = {
            _id: `api-${Math.random()}`, // Generate a unique ID
            title: recipe.title.trim(),
            ingredients: recipe.ingredients.split(', ').map(ing => ing.trim()),
            link: recipe.href, // Optional: Link to the full recipe
          };
          setApiRecipe(formattedRecipe);

          // Combine API recipe with user recipes
          setFilteredRecipes(prev => {
            const userRecipes = prev.filter(r => !r._id.startsWith('api-'));
            return [...userRecipes, formattedRecipe];
          });
        } else {
          setApiRecipe(null); // Clear API recipe if no match
        }
      })
      .catch(error => console.error('Error fetching API recipe:', error));
  };

  // Handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter user recipes based on the search term
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(value)
    );

    setFilteredRecipes(filtered);

    // Fetch the API recipe based on the search term
    fetchApiRecipe(value);
  };

  // Delete a recipe by ID
  const deleteRecipe = (id) => {
    if (id.startsWith('api-')) {
      // Remove API recipe locally
      setFilteredRecipes(filteredRecipes.filter(recipe => recipe._id !== id));
      setApiRecipe(null);
    } else {
      axios.delete(`https://four09-backend-ejlu.onrender.com/recipes/${id}`)
        .then(() => {
          const updatedRecipes = recipes.filter(recipe => recipe._id !== id);
          setRecipes(updatedRecipes);

          const updatedFilteredRecipes = updatedRecipes.filter(recipe =>
            recipe.title.toLowerCase().includes(searchTerm)
          );
          setFilteredRecipes(updatedFilteredRecipes);
        })
        .catch(error => console.error('Error deleting recipe:', error));
    }
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
                {recipe.link && (
                  <Card.Text>
                    <a href={recipe.link} target="_blank" rel="noopener noreferrer">View Full Recipe</a>
                  </Card.Text>
                )}
                <Button
                  variant="primary"
                  onClick={() => selectRecipe(recipe)}
                  className="me-2"
                >
                  View Recipe
                </Button>
                {!recipe._id.startsWith('api-') && (
                  <Button
                    variant="danger"
                    onClick={() => deleteRecipe(recipe._id)}
                  >
                    Delete
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
