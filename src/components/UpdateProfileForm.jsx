// @flow
import React from 'react';
import { withFormik } from 'formik';
import Yup from 'yup';
import TextInput from './elements/TextInput';
import FormButton from './elements/FormButton';
import FormWideError from './elements/FormWideError';

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
          <legend className="f4 fw6 ph0 mh0">Update Profile</legend>
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
  mapPropsToValues: props => ({
    firstName: props.profile.firstName || '',
    lastName: props.profile.lastName || '',
  }),
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
  }),
  // Submission handler
  handleSubmit: (values, { props, setSubmitting }) => {
    props.updateProfile(props.uid, values)
      .then(() => {
        setSubmitting(false);
        // add notification for success scenario
        props.sendSuccessMessage('Your profile has been updated');
      });
  },
  enableReinitialize: true,
})(InnerForm);

export default UpdateProfileForm;
