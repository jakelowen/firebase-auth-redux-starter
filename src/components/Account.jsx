// @flow
import React from 'react';
import UpdateProfile from './UpdateProfileForm';
import ChangePassword from './ChangePasswordForm';

const Account = ({
  profile,
  updateProfile,
  uid,
  updatePassword,
  sendSuccessMessage,
  sendErrorMessage,
}: {
    profile: Object,
    updateProfile: Function,
    uid: string,
    updatePassword: Function,
    sendSuccessMessage: Function,
    sendErrorMessage: Function,
  }) => (
    <div className="mw10 center ph3-ns">
      <h1 className="f2 lh-title mh3">Hi from account</h1>
      <div className="cf ph2-ns">
        <div className="fl w-100 w-50-ns pa2">
          <div className=" bg-white pa2" >
            <UpdateProfile
              profile={profile}
              updateProfile={updateProfile}
              uid={uid}
              sendSuccessMessage={sendSuccessMessage}
            />
          </div>
        </div>
        <div className="fl w-100 w-50-ns pa2">
          <div className=" bg-white pa2" >
            <ChangePassword
              updatePassword={updatePassword}
              sendSuccessMessage={sendSuccessMessage}
              sendErrorMessage={sendErrorMessage}
            />
          </div>
        </div>
      </div>
    </div>
);

export default Account;
