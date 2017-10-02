import React from 'react';
import Link from 'react-router-dom/Link';
import { renderRoutes } from 'react-router-config';
import Head from '../components/Head';
import Navbar from '../components/Navbar';
const styles = (typeof CSS !== 'undefined') && require('./MainTemplate.css');

const MainTemplate = ({route}) => {
  return (
    <div>
      <Head />
      <Navbar
        brand={
          <Link to="/">
            <h1 className="sr-only">Grace Covenant Church</h1>
            <img src="/static/images/gcclogo.jpg" />
          </Link>
        }
        links = {[
          <Link to="/page">Page</Link>,
          <Link to="/pages/async">Async Page</Link>
        ]}
      />
      <main>{renderRoutes(route.routes)}</main>
      <footer>
        <div className="container">
          <p>&copy; Grace Covenant Church</p>
        </div>
      </footer>
    </div>
  );
};

export default MainTemplate;
