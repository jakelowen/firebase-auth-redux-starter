// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signUpUser } from '../actions/auth';
import SignUp from '../components/SignUp';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  signUpUser: (firstName, lastName, email, password) =>
    dispatch(signUpUser(firstName, lastName, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
