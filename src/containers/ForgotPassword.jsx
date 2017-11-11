import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sendPasswordResetEmail } from '../actions/auth';
import ForgotPassword from '../components/ForgotPassword';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = () => ({
  sendPasswordResetEmail: email => sendPasswordResetEmail(email),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgotPassword));
