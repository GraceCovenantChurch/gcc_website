/* global mount, expect */

import React from 'react';
import toJSON from 'enzyme-to-json';
import Navbar from './Navbar';

describe('Navbar component', () => {
  it('opens and closes', (done) => {
    const navbar = mount(<Navbar
      brand={<a href="/">Brand</a>}
      links={[
        <a href="/">a</a>,
        <a href="/">b</a>,
        <a href="/">c</a>,
      ]}
    />);
    expect(toJSON(navbar)).toMatchSnapshot();

    const toggler = navbar.find('.navbar-toggler').at(0);

    // open nav
    toggler.simulate('click');
    navbar.update();
    expect(toJSON(navbar)).toMatchSnapshot();

    setTimeout(() => {
      // wait to open
      navbar.update();
      expect(toJSON(navbar)).toMatchSnapshot();

      // close nav
      toggler.simulate('click');
      navbar.update();
      expect(toJSON(navbar)).toMatchSnapshot();

      setTimeout(() => {
        // wait to close
        navbar.update();
        expect(toJSON(navbar)).toMatchSnapshot();
        done();
      }, 400);
    }, 400);
  });
});
