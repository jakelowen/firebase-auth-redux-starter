/* @flow */
import type { State, Action } from '../types/auth';

const initialState: State = {
  authenticated: false,
  error: null,
  uid: null,
  profile: {},
};

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        ...state,
        authenticated: true,
        error: null,
        uid: action.payload,
      };
    case 'SIGN_OUT_USER':
      return {
        ...state,
        authenticated: false,
        error: null,
        uid: null,
        profile: {},
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        error: action.payload.message,
        uid: null,
        profile: {},
      };
    case 'RECORD_USER_DETAILS':
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
}
