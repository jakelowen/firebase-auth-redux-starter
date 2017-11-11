/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import ForgotPassword from '../ForgotPassword';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ForgotPassword component', () => {
  it('matches snapshot ', () => {
    const wrapper = shallow(
      <ForgotPassword />
    );
    expect(wrapper).toMatchSnapshot();
  })
})
