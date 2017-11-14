import { TOAST_ADD_MESSAGE, TOAST_REMOVE_MESSAGE } from '../actions/toast';


export const initialState = {
  messages: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOAST_ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, {
          message: action.payload.message,
          timeout: action.payload.timeout,
          type: action.payload.type || 'INFO',
          // TODO: could use proper id creation util here
          id: new Date().getUTCMilliseconds(),
        }],
      };
    case TOAST_REMOVE_MESSAGE: {
      const newMessages = state.messages
        .filter(msg => msg.id !== action.payload);
      return {
        ...state,
        messages: newMessages,
      };
    }
    default:
      return state;
  }
}
