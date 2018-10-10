'use strict'

const Schema = use('Schema')

class ProjectSchema extends Schema {
  up() {
    this.create('projects', table => {
      table.increments()
      table.string('name', 254).notNullable()
      table.text('description')
      table.string('color', 7).notNullable()
      table
        .integer('owner_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
      table
        .boolean('archived')
        .defaultTo(false)
        .notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
