import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { renderRoutes } from 'react-router-config';

import NavbarDropdown from '../components/NavbarDropdown';
import Head from '../components/Head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './MainTemplate.css';
import navStyles from '../components/Navbar.css';

const MainTemplate = ({ route }) => (
  <div>
    <Head />
    <Navbar
      brand={
        <Link to="/">
          <h1 className="sr-only">Grace Covenant Church</h1>
          <img className={`${navStyles['logo-light']}`} src="/static/images/gcclogo.png" alt="Grace Covenant Church" />
          <img className={`${navStyles['logo-dark']}`} src="/static/images/gcclogo-black.png" alt="Grace Covenant Church" />
        </Link>
      }
      links={[
        <NavbarDropdown
          text="About">
          <Link to="/welcome">Welcome</Link>
          <Link to="/beliefs">Beliefs</Link>
          <Link to="/staff">Staff</Link>
          <a href="http://amichurches.com/">AMI</a>
        </NavbarDropdown>,
        <Link to="/familygroup">Family Groups</Link>,
        <Link to="/ministries">Ministries</Link>,
        <Link to="/page">Giving</Link>,
        <Link to="/pages">Multimedia</Link>,
        <Link to="/pages">Events</Link>,
      ]}
      className={`navbar-light ${navStyles['navbar-light']}`}
    />
    <main>{renderRoutes(route.routes)}</main>
    <Footer />
  </div>
);

MainTemplate.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array,
  }).isRequired,
};

export default MainTemplate;
