// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import Yup from 'yup';
import TextInput from './elements/TextInput';
import FormButton from './elements/FormButton';
import FormWideError from './elements/FormWideError';
import FormWideNotification from './elements/FormWideNotification';

/*
const PasswordForgetPage = ({ sendPasswordResetEmail }: { sendPasswordResetEmail: Function }) =>
  <PasswordForgetForm sendPasswordResetEmail={sendPasswordResetEmail} />;
*/

// Our inner form component which receives our form's state and updater methods as props
const InnerForm = ({
  values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, status,
}: {
    values: Object,
    errors: Object,
    touched: Object,
    handleChange: Function,
    handleBlur: Function,
    handleSubmit: Function,
    isSubmitting: boolean,
    status: string,
  }) =>
  (
    <main className="pa4 black-80">
      <form onSubmit={handleSubmit} className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Reset my password</legend>
          <FormWideError error={errors.formwide} />
          <FormWideNotification message={status} />
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
        </fieldset>
        <FormButton
          disabled={Object.keys(errors).length !== 0 || isSubmitting}
          text="Reset Password"
        />
        <div className="lh-copy mt3">
          <Link to="/signup">
            <div className="f6 link dim black db">Don&apos;t have an account?</div>
          </Link>
          <Link to="/signin">
            <div className="f6 link dim black db">Sign In</div>
          </Link>
        </div>
      </form >
    </main >
  );

// Wrap our form with the using withFormik HoC
const PasswordForgetForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: () => ({ email: '' }),
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),
  // Submission handler
  handleSubmit: (values, { props, setSubmitting }) => {
    props.sendPasswordResetEmail(values.email)
      .then(() => {
        setSubmitting(false);
        // setStatus('Email sent. Check your inbox');
        props.sendSuccessMessage('Email sent. Check your inbox');
      })
      .catch(() => {
        // Dont tell them if account exists or not.
        setSubmitting(false);
        // setStatus('Email sent. Check your inbox');
        props.sendSuccessMessage('Email sent. Check your inbox');
      });
  },
})(InnerForm);


export default PasswordForgetForm;
