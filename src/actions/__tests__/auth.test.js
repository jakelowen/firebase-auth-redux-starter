/* eslint-disable */
import * as authActions from '../auth'

describe('AuthActions', () => {
  it('authUser action creator matches snapshot ', () => {
    const payload = authActions.authUser("12345")
    expect(payload).toMatchSnapshot();
  })

  it('authUser action creator matches snapshot ', () => {
    const payload = authActions.authError({ code: "12345", message: "error!" })
    expect(payload).toMatchSnapshot();
  })

  // Need to mock / test firebase specific stuff someday

})
