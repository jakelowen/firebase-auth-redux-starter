/* eslint-disable */
import reducers from '../index';

test('reducers produce correct empty state', () => {
  const state = reducers(undefined, {});
  expect(state).toEqual({ auth: { authenticated: false, error: null, uid: null, profile: {} } });
});