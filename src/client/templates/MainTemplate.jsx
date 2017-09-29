import React from 'react';
import { renderRoutes } from 'react-router-config';
import Head from '../components/Head';
import Navbar from '../components/Navbar';
const styles = (typeof CSS !== 'undefined') && require('./MainTemplate.css');

const MainTemplate = ({route}) => {
  return (
    <div>
      <Head />
      <Navbar />
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
