/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow'
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('matches snapshot', () => {
  const shallow = new ShallowRenderer();
  shallow.render(<App />);
  const result = shallow.getRenderOutput();
  expect(result).toMatchSnapshot();
})
