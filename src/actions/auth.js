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

export function updateUserRecord(uid: string, data: Object) {
  return db.collection('users').doc(uid).update(data);
}

export function listenForUserProfileUpdates(uid: string) {
  return (dispatch: Dispatch) => db.collection('users').doc(uid)
    .onSnapshot((doc) => {
      if (doc.exists) {
        dispatch({
          type: 'RECORD_USER_DETAILS',
          payload: doc.data(),
        });
      }
    });
}

export function signUpUser(firstName: string, lastName: string, email: string, password: string) {
  return Firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      createUserRecord(user.uid, firstName, lastName, email);
    });
}

// export function updateProfile(uid: string, data: Object) {
//   updateUserRecord(uid, data);
// }

export function signInUser(credentials: { email: string, password: string }) {
  return Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
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

export function updatePassword(newPassword: string) {
  const user = Firebase.auth().currentUser;
  return user.updatePassword(newPassword);
}


export function verifyAuth() {
  return (dispatch: Dispatch) => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(authUser(user.uid));
        db.collection('users').doc(user.uid)
          .onSnapshot((doc) => {
            if (doc.exists) {
              dispatch({
                type: 'RECORD_USER_DETAILS',
                payload: doc.data(),
              });
            }
          });
      } else {
        dispatch(signOutUser());
      }
    });
  };
}

