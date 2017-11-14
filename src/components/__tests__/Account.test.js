/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import Account from '../Account';
import ChangePasswordForm from '../ChangePasswordForm'
import UpdateProfileForm from '../UpdateProfileForm'

describe('Account component', () => {
  it('root account component matches snapshot ', () => {
    const wrapper = shallow(
      <Account />
    );
    expect(wrapper).toMatchSnapshot();
  })

  it('changePasswordForm component matches snapshot ', () => {
    const wrapper = shallow(
      <ChangePasswordForm />
    );
    expect(wrapper).toMatchSnapshot();
  })

  it('UpdateProfileForm component matches snapshot ', () => {
    const wrapper = shallow(
      <UpdateProfileForm profile={{ firstName: "Test", lastName: "Guy" }} />
    );
    expect(wrapper).toMatchSnapshot();
  })
})
