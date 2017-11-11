/* @flow */
/* eslint-disable */

export type State = {
  +authenticated: boolean,
  +error: string | null,
    +uid: string | null,
};

export type authUserActionType = {
  type: 'AUTH_USER',
  payload: string
}

export type signOutUserActionType = {
  type: 'SIGN_OUT_USER'
}

export type authErrorActionType = {
  type: 'AUTH_ERROR',
  payload: {
    code: string,
    message: string
  }
}

export type recordUserDetails = {
  type: 'RECORD_USER_DETAILS',
  payload: {
    uid: string,
    firstName: string,
    lastName: string,
    email: string,
  },
}

export type Action =
  | authUserActionType
  | authErrorActionType
  | signOutUserActionType
  | recordUserDetails

export type GetState = () => State;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
