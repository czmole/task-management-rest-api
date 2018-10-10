'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Factory = use('Factory')
const USERS_AMOUNT = 16
const PROJECTS_AMOUNT = 16

Factory.blueprint('App/Models/User', faker => {
  return {
    first_name: faker.first(),
    last_name: faker.last(),
    email: faker.email(),
    color: faker.color({ format: 'hex' }),
    password: 'secret'
  }
})

Factory.blueprint('App/Models/Project', faker => {
  return {
    name: faker.sentence(),
    description: faker.paragraph(),
    color: faker.color({ format: 'hex' }),
    owner_id: faker.integer({ min: 1, max: USERS_AMOUNT })
  }
})

Factory.blueprint('App/Models/Task', faker => {
  return {
    name: faker.sentence(),
    description: faker.paragraph(),
    owner_id: faker.integer({ min: 1, max: USERS_AMOUNT }),
    assignee_id: faker.integer({ min: 1, max: USERS_AMOUNT }),
    project_id: faker.integer({ min: 1, max: PROJECTS_AMOUNT })
  }
})

Factory.blueprint('App/Models/Role', () => {
  return { name: 'Admin' }
})
