/* eslint-disable */

import React from 'react';
import App from '../App';


describe('Main App component', () => {
  it('matches snapshot', () => {
    // as soon as I include firestore anywhere in my app I get this error:
    // Cannot find module 'grpc' from 'grpc_connection.js' 
    // and test fails
    const wrapper = shallow(
      <App />
    );
    expect(wrapper).toMatchSnapshot();
  })

  // it('above is broken, firestore issue, see notes', () => {
  //   expect(true).toEqual(true)
  // })
})

