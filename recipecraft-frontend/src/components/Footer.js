// src/components/Footer.js

import React from 'react';

function Footer() {
  return (
    <footer className="text-center mt-4 mb-4">
      <p>&copy; {new Date().getFullYear()} RecipeCraft</p>
    </footer>
  );
}

export default Footer;
