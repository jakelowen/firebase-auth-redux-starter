import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signInUser } from '../actions/auth';
import SignIn from '../components/SignIn';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  signInUser: credentials => dispatch(signInUser(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
