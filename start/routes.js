'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const API_PREFIX = 'api/v1'

// Auth routes
Route.post(`${API_PREFIX}/login`, 'LoginController.login').middleware('guest')
Route.post(`${API_PREFIX}/logout`, 'LoginController.logout').middleware('auth')

// Project routes
Route.group(() => {
  Route.get('', 'ProjectController.index').middleware('auth')
  Route.get(':project', 'ProjectController.show').middleware('auth')
  Route.post('', 'ProjectController.store').middleware('auth')
  Route.patch(':project/archive', 'ProjectController.archive').middleware(
    'auth'
  )
  Route.patch(':project', 'ProjectController.update').middleware('auth')
}).prefix(`${API_PREFIX}/projects`)

// Task routes
Route.group(() => {
  Route.get('', 'TaskController.index').middleware('auth')
  Route.get('project/:project', 'TaskController.project').middleware('auth')
  Route.get('assignee/:user', 'TaskController.assignee').middleware('auth')
  Route.get(':task', 'TaskController.show').middleware('auth')
  Route.post('', 'TaskController.store').middleware('auth')
  Route.patch(':task/complete', 'TaskController.complete').middleware('auth')
  Route.patch(':task', 'TaskController.update').middleware('auth')
  Route.delete(':task', 'TaskController.destroy').middleware('auth')
}).prefix(`${API_PREFIX}/tasks`)
