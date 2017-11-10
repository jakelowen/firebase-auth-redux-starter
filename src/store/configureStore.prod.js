import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import * as Actions from '../actions/auth';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk),
  );
  store.dispatch(Actions.verifyAuth());
  return store;
};

export default configureStore;
