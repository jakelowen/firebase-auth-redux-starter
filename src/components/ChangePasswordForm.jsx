// @flow
import React from 'react';
import { withFormik } from 'formik';
import Yup from 'yup';
import TextInput from './elements/TextInput';
import FormButton from './elements/FormButton';
import FormWideError from './elements/FormWideError';
import { equalTo } from '../../src/helpers';


Yup.addMethod(Yup.string, 'equalTo', equalTo);

// Our inner form component which receives our form's state and updater methods as props
const InnerForm = ({
  values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,
}: {
    values: Object,
    errors: Object,
    touched: Object,
    handleChange: Function,
    handleBlur: Function,
    handleSubmit: Function,
    isSubmitting: boolean
  }) =>
  (
    <main className="black-80">
      <form onSubmit={handleSubmit} className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Change Password</legend>
          <FormWideError error={errors.formwide} />
          <div className="mt3">
            <TextInput
              id="password"
              type="password"
              label="Password"
              error={touched.password && errors.password}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="mv3">
            <TextInput
              id="passwordConfirm"
              type="password"
              label="Confirm Password"
              error={touched.passwordConfirm && errors.passwordConfirm}
              value={values.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </fieldset>
        <FormButton
          disabled={Object.keys(errors).length !== 0 || isSubmitting}
          text="Update Profile"
        />
      </form>
    </main>
  );

// Wrap our form with the using withFormik HoC
const UpdateProfileForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: () => ({
    password: '', passwordConfirm: '',
  }),
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .equalTo(Yup.ref('password'), 'Passwords must match')
      .required('Must confirm Password'),
  }),
  // Submission handler
  handleSubmit: (values, { props, setSubmitting, setValues }) => {
    props.updatePassword(values.password)
      .then(() => {
        setSubmitting(false);
        // add notification for success scenario
        props.sendSuccessMessage('Your password has been changed.');
        setValues({ password: '', passwordConfirm: '' });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/requires-recent-login':
            props.sendErrorMessage('This operation is sensitive and requires recent authenication. Log in again before retrying this request.');
            break;
          default:
            props.sendErrorMessage('Sorry, Something went wrong.');
            break;
        }
        setSubmitting(false);
      });
  },
  enableReinitialize: true,
})(InnerForm);

export default UpdateProfileForm;
