'use strict'

class LoginController {
  /**
   * Login user
   *
   * @param {*} { request, auth }
   * @returns {JSON}
   * @memberof LoginController
   */
  async login({ request, auth }) {
    const { email, password } = request.all()

    return await auth.attempt(email, password)
  }
}

module.exports = LoginController
