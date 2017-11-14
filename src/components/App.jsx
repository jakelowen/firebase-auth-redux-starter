/* @flow */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import NavBar from '../containers/NavBar';
import SignIn from '../containers/SignIn';
import ForgotPassword from '../containers/ForgotPassword';
import SignUp from '../containers/SignUp';
import Account from '../containers/Account';
import HOCAuthRequired from '../containers/HOCAuthRequired';
import Toast from '../containers/Toast';

const protectedAccount = () => (
  <HOCAuthRequired>
    <Account />
  </HOCAuthRequired>
);

const App = () => (
  <div className="sans-serif">
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Route path="/signup" component={SignUp} />
      <Route path="/account" component={protectedAccount} />
    </Switch>
    <Toast />
  </div>
);

export default App;
