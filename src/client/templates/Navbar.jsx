import React from 'react';
import Link from 'react-router-dom/Link';

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link><br />
      <Link to="/page">Page</Link><br />
      <Link to="/pages/async">Async Page</Link><br />
    </div>
  );
}

export default Navbar;
