'use strict'

/*
|--------------------------------------------------------------------------
| TaskSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class TaskSeeder {
  async run() {
    await Factory.model('App/Models/Task').createMany(16)
  }
}

module.exports = TaskSeeder
