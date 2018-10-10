'use strict'

const Schema = use('Schema')

class TaskSchema extends Schema {
  up() {
    this.create('tasks', table => {
      table.increments()
      table.string('name', 254).notNullable()
      table.text('description')
      table
        .integer('owner_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
      table
        .integer('assignee_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .notNullable()
      table
        .boolean('completed')
        .defaultTo(false)
        .notNullable()
      table.date('due_date')
      table.timestamps()
    })
  }

  down() {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
