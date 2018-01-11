import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import { renderRoutes } from 'react-router-config';
import Head from '../../client/components/Head';
import Navbar from '../../client/components/Navbar';
import Notifications from '../components/Notifications';
const styles = (typeof CSS !== 'undefined') && require('./AdminTemplate.css');

const AdminTemplate = ({route}) => {
  return (
    <div>
      <Head />
      <Navbar
        brand={
          <Link to="/">
            <h1 className="sr-only">Grace Covenant Church Admin Panel</h1>
            <img src="/static/images/gcclogo-black.png" />
          </Link>
        }
        links = {[
          <Link to="/events">Events</Link>,
          <Link to="/ministries">Ministries</Link>,
          <a href="/logout">Log Out</a>,
        ]}
        className="navbar-light"
      />
      <Notifications />
      <main>{renderRoutes(route.routes)}</main>
      <footer>
        <div className="container">
          <p>&copy; Grace Covenant Church</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminTemplate;
