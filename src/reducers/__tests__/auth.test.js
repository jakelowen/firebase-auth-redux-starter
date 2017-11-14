/* eslint-disable */
import reducers from '../../reducers';

test('auth_user_action', () => {
  const state = reducers({ auth: { authenticated: false, error: null, uid: null } }, { type: 'AUTH_USER', payload: 'CRpzVM5RrtegOX65qaQxJ5geMmk2' });
  expect(state).toEqual({ auth: { authenticated: true, error: null, uid: 'CRpzVM5RrtegOX65qaQxJ5geMmk2' }, "toast": { "messages": [] } });
});

test('sign out user action', () => {
  const state = reducers({ auth: { authenticated: true, error: null, uid: 'DgJDJLETXIPdMcecU6g8DmUm3Ku1', profile: { uid: 'DgJDJLETXIPdMcecU6g8DmUm3Ku1', firstName: 'Jake', lastName: 'Lowen', email: 'jake@gpsimpact.com' } } }, { type: 'SIGN_OUT_USER' });
  expect(state).toEqual({ auth: { authenticated: false, error: null, uid: null, profile: {} }, "toast": { "messages": [] } });
});

test('record user details', () => {
  const state = reducers({ auth: { authenticated: false, error: null, uid: null, profile: {} } }, { type: 'RECORD_USER_DETAILS', payload: { uid: 'DgJDJLETXIPdMcecU6g8DmUm3Ku1', firstName: 'Jake', lastName: 'Lowen', email: 'jake@gpsimpact.com' } });
  expect(state).toEqual({ auth: { authenticated: false, error: null, uid: null, profile: { uid: 'DgJDJLETXIPdMcecU6g8DmUm3Ku1', firstName: 'Jake', lastName: 'Lowen', email: 'jake@gpsimpact.com' } }, "toast": { "messages": [] } });
});
