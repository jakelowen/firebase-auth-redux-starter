/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import NavBar, { NavigationAuth, NavigationNonAuth } from '../NavBar';
import { BrowserRouter as Router } from 'react-router-dom';

describe('NavBar component', () => {
  it('matches snapshot for non-authed', () => {
    const wrapper = render(
      <Router>
        <NavBar isAuthenticated={false} />
      </Router>
    );
    expect(wrapper).toMatchSnapshot();
  })

  it('matches snapshot for authed', () => {
    const wrapper = render(
      <Router>
        <NavBar isAuthenticated={false} />
      </Router>
    );
    expect(wrapper).toMatchSnapshot();
  })

})
