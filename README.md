# Task management REST API (Node.js)

My first REST API written in Node.js using Adonis.js as framework. So what does it have to offer?

- Models, Migrations, Seeds
  - User
  - Token
  - Role
  - Project
  - Task
- Controllers
  - LoginController
  - ProjectController
  - TaskController
- 15 API endpoints
- Documented with JSDoc
- Factories
- JWT authentication
- Protected middleware

## Installation

Before you proceed please read the documentation of [Adonis 4.1](https://adonisjs.com/docs/4.1/about)
to make the process a lot smoother.

### Step 1

Clone a copy of this repository `git clone https://github.com/Larsklopstra/task-management-rest-api`

### Step 2

Run `npm i` to install all the dependencies.

### Step 3

Make a new `.env` file using the `.env.example` and fill it out with your data.

### Step 4

Run `adonis key:generate`

### Step 5

Run `adonis migration:run --seed` you're now the proud owner of a REST API! You can login with any of the emails and the password: `secret`

## Future updates

In the future I'll add more methods such as sorting by `parameters` and add an `AuthorizationService` that will make use of the roles. Next up is creating a client using Vue.js and Vuex so I can consume this REST API (This will become a stand-alone repository).
