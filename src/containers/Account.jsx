// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUserRecord, updatePassword } from '../actions/auth';
import Account from '../components/Account';
import { addSuccess, addError } from '../actions/toast';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
  profile: state.auth.profile,
  uid: state.auth.uid,
});

const mapDispatchToProps = dispatch => ({
  updateProfile: (uid, data) => updateUserRecord(uid, data),
  updatePassword: newPassword => updatePassword(newPassword),
  sendSuccessMessage: message => dispatch(addSuccess(message)),
  sendErrorMessage: message => dispatch(addError(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Account));
