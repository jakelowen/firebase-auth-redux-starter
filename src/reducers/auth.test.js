/* eslint-disable */
import reducers from '../reducers';

test('auth_user_action', () => {
  const state = reducers({ auth: { authenticated: false, error: null, uid: null } }, { type: 'AUTH_USER', payload: 'CRpzVM5RrtegOX65qaQxJ5geMmk2' });
  expect(state).toEqual({ auth: { authenticated: true, error: null, uid: 'CRpzVM5RrtegOX65qaQxJ5geMmk2' } });
});
