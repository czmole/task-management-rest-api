'use strict'

/*
|--------------------------------------------------------------------------
| ProjectSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class ProjectSeeder {
  async run() {
    await Factory.model('App/Models/Project').createMany(16)
  }
}

module.exports = ProjectSeeder
