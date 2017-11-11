/* @flow */
import Firebase from 'firebase';
import type {
  authUserActionType,
  authErrorActionType,
  Dispatch,
} from '../types/auth';

require('firebase/firestore');

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
// Initialize Cloud Firestore through Firebase
// $FlowFixMe
const db = Firebase.firestore();

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

export function createUserRecord(uid: string, firstName: string, lastName: string, email: string) {
  return db.collection('users').doc(uid).set({
    firstName,
    lastName,
    email,
    uid,
  });
}

export function signUpUser(firstName: string, lastName: string, email: string, password: string) {
  return (dispatch: Dispatch) =>
    Firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        createUserRecord(user.uid, firstName, lastName, email);
        dispatch({
          type: 'RECORD_USER_DETAILS',
          payload: {
            uid: user.uid,
            firstName,
            lastName,
            email,
          },
        });
      });
}

export function signInUser(credentials: { email: string, password: string }) {
  return (dispatch: Dispatch) =>
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .catch((error) => {
        dispatch(authError(error));
      });
}

export function signOutUser() {
  return (dispatch: Dispatch) => Firebase.auth().signOut()
    .then(() => {
      dispatch({
        type: 'SIGN_OUT_USER',
      });
    });
}

export function sendPasswordResetEmail(email: string) {
  return Firebase.auth().sendPasswordResetEmail(email);
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

