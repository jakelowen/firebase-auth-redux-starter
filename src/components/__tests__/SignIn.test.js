/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SignInPage from '../SignIn';

describe('SignIn component', () => {
  it('matches snapshot', () => {
    const signInUser = jest.fn();
    const history = {
      push: jest.fn()
    }

    const wrapper = render(
      <Router>
        <SignInPage isAuthenticated={false} signInUser={signInUser} history={history} />
      </Router>
    );
    expect(wrapper).toMatchSnapshot();
  })

  it('redirects on authed state', () => {
    const signInUser = jest.fn();
    const push = jest.fn()
    const history = {
      push
    }

    const wrapper = render(
      <Router>
        <SignInPage isAuthenticated={true} signInUser={signInUser} history={history} />
      </Router>
    );
    expect(history.push).toHaveBeenCalledWith('/account')
  })
})