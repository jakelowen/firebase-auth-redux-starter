/* @flow */
import Firebase from 'firebase';
import type {
  authUserActionType,
  authErrorActionType,
  Dispatch,
} from '../types/auth';


// pull out firebase into its own file soon.
const config = {
  apiKey: 'AIzaSyC3en9Q3XwoyhlyCY8wQbXK8MSVVBg_H6s',
  authDomain: 'nextjs-firebase-auth-test.firebaseapp.com',
  databaseURL: 'https://nextjs-firebase-auth-test.firebaseio.com',
  projectId: 'nextjs-firebase-auth-test',
  storageBucket: 'nextjs-firebase-auth-test.appspot.com',
  messagingSenderId: '90669433896',
};

Firebase.initializeApp(config);

export function authUser(uid: string): authUserActionType {
  return {
    type: 'AUTH_USER',
    payload: uid,
  };
}

export function authError(error: { code: string, message: string }): authErrorActionType {
  return {
    type: 'AUTH_ERROR',
    payload: error,
  };
}

export function signUpUser(credentials: { email: string, password: string }) {
  return (dispatch: Dispatch) => {
    Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      // I don't think we need this because onAuthStateChanged should catch it
      // .then(() => {
      //   dispatch(authUser());
      // })
      .catch((error) => {
        dispatch(authError(error));
      });
  };
}

export function signInUser(credentials: { email: string, password: string }) {
  return (dispatch: Dispatch) => {
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      // I don't think we need this because onAuthStateChanged should catch it
      // .then(() => {
      //     dispatch(authUser());
      //   })
      .catch((error) => {
        dispatch(authError(error));
      });
  };
}

export function signOutUser() {
  return (dispatch: Dispatch) => {
    Firebase.auth().signOut()
      .then(() => {
        dispatch({
          type: 'SIGN_OUT_USER',
        });
      });
  };
}

export function verifyAuth() {
  return (dispatch: Dispatch) => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(authUser(user.uid));
      } else {
        dispatch(signOutUser());
      }
    });
  };
}

