'use strict'

class AuthorizationService {
  verifyRoles(user, requiredRoles) {
    if (requiredRoles.includes(user.role.name)) {
      return false // TODO: AuthorizationService
    }
  }
}

module.exports = new AuthorizationService()
