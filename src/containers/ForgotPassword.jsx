// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sendPasswordResetEmail } from '../actions/auth';
import ForgotPassword from '../components/ForgotPassword';
import { addSuccess } from '../actions/toast';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  sendPasswordResetEmail: email => sendPasswordResetEmail(email),
  sendSuccessMessage: message => dispatch(addSuccess(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgotPassword));
