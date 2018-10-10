'use strict'

const Model = use('Model')

class Role extends Model {
  /**
   * Role belongs to many users
   *
   * @returns {void}
   * @memberof Role
   */
  users() {
    return this.belongsToMany('App/Models/User')
  }
}

module.exports = Role
