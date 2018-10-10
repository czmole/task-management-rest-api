'use strict'

const Model = use('Model')

class Task extends Model {
  /**
   * Task has one owner (creator)
   *
   * @returns {void}
   * @memberof Task
   */
  owner() {
    return this.belongsTo('App/Models/User', 'owner_id', 'id')
  }

  /**
   * Task has one assignee
   *
   * @returns {void}
   * @memberof Task
   */
  assignee() {
    return this.belongsTo('App/Models/User', 'assignee_id', 'id')
  }

  /**
   * Task has one project
   *
   * @returns {void}
   * @memberof Task
   */
  project() {
    return this.belongsTo('App/Models/Project')
  }
}

module.exports = Task
