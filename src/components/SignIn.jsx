// @flow
import React, { Component } from 'react';
import { withFormik } from 'formik';
import Yup from 'yup';
import { Link } from 'react-router-dom';
import TextInput from './elements/TextInput';
import FormWideError from './elements/FormWideError';
import FormButton from './elements/FormButton';

type Props = {
  signInUser: Function,
  history: Object,
  isAuthenticated: boolean
};

class SignInPage extends Component<Props> {
  // if is authed, redirect away.
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/account');
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isAuthenticated) {
      this.props.history.push('/account');
    }
  }

  render() {
    return (
      <SignInForm signInUser={this.props.signInUser} redirect={this.props.history.push} />
    );
  }
}

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
          <legend className="f4 fw6 ph0 mh0">Sign In</legend>
          <FormWideError error={errors.formwide} />
          <div className="mt3">
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
        </fieldset>
        <FormButton
          disabled={Object.keys(errors).length !== 0 || isSubmitting}
          text="Sign in"
        />
        <div className="lh-copy mt3">
          <Link to="/signup">
            <span className="f6 link dim black db">Don&apos;t have an account?</span>
          </Link>
          <Link to="/forgotpassword">
            <span className="f6 link dim black db">Forgot your password?</span>
          </Link>
        </div>
      </form>
    </main>
  );

// Wrap our form with the using withFormik HoC
const SignInForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: () => ({ email: '', password: '' }),
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    password: Yup.string()
      .required('Password is required'),
  }),
  // Submission handler
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.signInUser({ email: values.email, password: values.password })
      .then(() => {
        setSubmitting(false);
        props.redirect('/account');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setErrors({ formwide: 'The username or password you have entered is invalid.' });
            break;
          default:
            setErrors({ formwide: 'Sorry, Something went wrong.' });
            break;
        }
        // console.error(error);
      });
  },
})(InnerForm);

export default SignInPage;
