// @flow
import { connect } from 'react-redux';
import { signOutUser } from '../actions/auth';
import NavBar from '../components/NavBar';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
