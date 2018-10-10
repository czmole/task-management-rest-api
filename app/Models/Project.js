'use strict'

const Model = use('Model')

class Project extends Model {
  /**
   * Project has one owner (creator)
   *
   * @returns {void}
   * @memberof Project
   */
  owner() {
    return this.belongsTo('App/Models/User', 'owner_id', 'id')
  }

  /**
   * Project has multiple tasks
   *
   * @returns {void}
   * @memberof Project
   */
  tasks() {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Project
