import React from 'react';
import { renderRoutes } from 'react-router-config';
import Head from '../../client/templates/Head';
import AdminNavbar from './AdminNavbar';

const MainTemplate = ({route}) => {
  return (
    <div>
      <Head />
      <AdminNavbar />
      <div className="container">
        {renderRoutes(route.routes)}
      </div>
    </div>
  );
};

export default MainTemplate;
