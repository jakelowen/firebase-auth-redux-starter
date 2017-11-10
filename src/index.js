/* @flow */
/* eslint-disable prop-types, react/jsx-filename-extension, no-undef */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import './index.css';

const store = configureStore();

render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  // eslint-disable-next-line no-undef $FlowFixMe
  document.getElementById('root'),
);
registerServiceWorker();
