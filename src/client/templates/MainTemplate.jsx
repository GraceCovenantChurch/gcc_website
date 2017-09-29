import React from 'react';
import { renderRoutes } from 'react-router-config';
import Head from './Head';
import Navbar from './Navbar';

const MainTemplate = ({route}) => {
  return (
    <div>
      <Head />
      <Navbar />
      <div className="container">
        {renderRoutes(route.routes)}
      </div>
    </div>
  );
};

export default MainTemplate;
