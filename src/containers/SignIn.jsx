// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signInUser, authError } from '../actions/auth';
import { addError } from '../actions/toast';
import SignIn from '../components/SignIn';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  signInUser: credentials => signInUser(credentials),
  sendErrorMessage: message => dispatch(addError(message)),
  authError: error => dispatch(authError(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
