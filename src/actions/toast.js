// Action types
export const TOAST_ADD_MESSAGE = 'TOAST_ADD_MESSAGE';
export const TOAST_REMOVE_MESSAGE = 'TOAST_REMOVE_MESSAGE';

// Actions
// export const removeToast = createAction(TOAST_REMOVE_MESSAGE);

export const addToast = message => ({
  type: TOAST_ADD_MESSAGE,
  payload: {
    message,
  },
});

export const removeToast = toastId => ({
  type: TOAST_REMOVE_MESSAGE,
  payload: toastId,
});

// Custom Actions (shorthands)
export const addSuccess = message => ({
  type: TOAST_ADD_MESSAGE,
  payload: { type: 'SUCCESS', message },
});

export const addError = message => ({
  type: TOAST_ADD_MESSAGE,
  payload: { type: 'ERROR', message },
});

export const addWarning = message => ({
  type: TOAST_ADD_MESSAGE,
  payload: { type: 'WARNING', message },
});

// Selectors
export const getToasts = state => state.toast.messages;
