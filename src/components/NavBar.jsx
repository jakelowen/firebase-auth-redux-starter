// @flow
/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events */
import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// eslint-disable-next-line max-len
const Navigation = ({ isAuthenticated, signOut }: { isAuthenticated: boolean, signOut: Function }) =>
  (
    <div>
      {isAuthenticated
        ? <NavigationAuth signOut={signOut} />
        : <NavigationNonAuth />
      }
    </div>
  );

const NavigationAuth = ({ signOut }: { signOut: Function }) =>
  (
    <nav className="flex justify-between bb bg-black b--white-10">
      <Link to="/">
        <div className="link white-70 hover-white no-underline flex items-center pa3" >
          <svg
            className="dib h1 w1"
            data-icon="grid"
            viewBox="0 0 32 32"
            style={{ fill: 'currentcolor' }}
          >
            <title>Super Normal Icon Mark</title>
            <path d="M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z" />
          </svg>
        </div>
      </Link>
      <div className="flex-grow pa3 flex items-center">
        <Link to="/home">
          <div className="f6 link dib white dim mr3 mr4-ns">Home</div>
        </Link>
        <Link to="/account">
          <div className="f6 link dib white dim mr3 mr4-ns">Account</div>
        </Link>
        <div
          tabIndex={0}
          role="button"
          className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20"
          onClick={signOut}
        >
          Sign Out
        </div>
      </div>
    </nav>
  );


const NavigationNonAuth = () =>
  (
    <nav className="flex justify-between bb bg-black b--white-10">
      <Link to="/">
        <div className="link white-70 hover-white no-underline flex items-center pa3">
          <svg
            className="dib h1 w1"
            data-icon="grid"
            viewBox="0 0 32 32"
            style={{ fill: 'currentcolor' }}
          >
            <title>Super Normal Icon Mark</title>
            <path d="M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z" />
          </svg>
        </div>
      </Link>
      <div className="flex-grow pa3 flex items-center">
        <Link to="/signin">
          <div className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20" href="#0">Login</div>
        </Link>
      </div>
    </nav>
  );

export default Navigation;
export { NavigationAuth, NavigationNonAuth };
