// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import Yup from 'yup';
import TextInput from './elements/TextInput';
import FormButton from './elements/FormButton';
import FormWideError from './elements/FormWideError';
import { equalTo } from '../../src/helpers';

const SignUpPage = ({ signUpUser, history }: { signUpUser: Function, history: Object }) =>
  <SignUpForm signUpUser={signUpUser} redirect={history.push} />;

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
    <main className="pa4 black-80">
      <form onSubmit={handleSubmit} className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Register a new account</legend>
          <FormWideError error={errors.formwide} />
          <div className="mt3">
            <TextInput
              id="firstName"
              type="text"
              label="First Name"
              error={touched.firstName && errors.firstName}
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="mv3">
            <TextInput
              id="lastName"
              type="text"
              label="Last Name"
              error={touched.lastName && errors.lastName}
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="mv3">
            <TextInput
              id="email"
              type="text"
              label="Email"
              error={touched.email && errors.email}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="mv3">
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
          text="Sign in"
        />
        <div className="lh-copy mt3">
          <Link to="/signin">
            <div className="f6 link dim black db">Sign In to existing account</div>
          </Link>
          <Link to="/forgotPassword">
            <div className="f6 link dim black db">Forgot your password?</div>
          </Link>
        </div>
      </form>
    </main>
  );

// Wrap our form with the using withFormik HoC
const SignUpForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: () => ({
    firstName: '', lastName: '', email: '', password: '', passwordConfirm: '',
  }),
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    password: Yup.string()
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .equalTo(Yup.ref('password'), 'Passwords must match')
      .required('Must confirm Password'),
  }),
  // Submission handler
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.signUpUser(values.firstName, values.lastName, values.email, values.password)
      .then(() => {
        setSubmitting(false);
        props.redirect('/account');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setErrors({ formwide: 'There is already an account tied to this email address.' });
            break;
          case 'auth/invalid-email':
            setErrors({ formwide: 'Invalid email address' });
            break;
          case 'auth/weak-password':
            setErrors({ formwide: 'Your password is too weak. Try something harder to guess.' });
            break;
          default:
            setErrors({ formwide: 'Sorry, Something went wrong.' });
            break;
        }
      });
  },
})(InnerForm);

export default SignUpPage;
