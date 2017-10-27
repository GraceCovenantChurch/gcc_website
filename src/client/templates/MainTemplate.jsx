import React from 'react';
import Link from 'react-router-dom/Link';
import { renderRoutes } from 'react-router-config';
import Head from '../components/Head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const styles = (typeof CSS !== 'undefined') && require('./MainTemplate.css');

const MainTemplate = ({route}) => {
  return (
    <div>
      <Head />
      <Navbar
        brand={
          <Link to="/">
            <h1 className="sr-only">Grace Covenant Church</h1>
            <img id="logo" src="/static/images/gcclogo.png" />
          </Link>
        }
        links = {[
          <Link to="/page">I'm New</Link>,
          <Link to="/pages">About</Link>,
          <Link to="/page">Family Groups</Link>,
          <Link to="/pages">Ministries</Link>,
          <Link to="/page">Giving</Link>,
          <Link to="/pages">Multimedia</Link>,
          <Link to="/pages">Events</Link>
        ]}
      />
      <main>{renderRoutes(route.routes)}</main>
      <Footer></Footer>
    </div>
  );
};

export default MainTemplate;
