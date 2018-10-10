'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  /**
   * User role
   *
   * @returns {void}
   * @memberof User
   */
  role() {
    return this.hasOne('App/Models/Role')
  }

  /**
   * User has multiple tasks (created)
   *
   * @returns {void}
   * @memberof Task
   */
  ownedTasks() {
    return this.hasMany('App/Models/Task', 'id', 'owner_id')
  }

  /**
   * User has multiple assigned tasks (assignee)
   *
   * @returns {void}
   * @memberof Task
   */
  assignedTasks() {
    return this.belongsToMany('App/Models/Task', 'id', 'assignee_id')
  }

  /**
   * User has multiple project
   *
   * @returns {void}
   * @memberof Task
   */
  ownedProjects() {
    return this.hasMany('App/Models/Project', 'id', 'owner_id')
  }
}

module.exports = User
