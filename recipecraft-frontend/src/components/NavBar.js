// // src/components/Navbar.js

// import React from 'react';
// import { Navbar, Nav } from 'react-bootstrap';

// function NavigationBar() {
//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//       <Navbar.Brand href="/">RecipeCraft</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     </Navbar>
//   );
// }

// export default NavigationBar;

// src/components/NavBar.js

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">RecipeCraft</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/ideas">Recipe Ideas</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
