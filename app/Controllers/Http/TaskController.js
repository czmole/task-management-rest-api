'use strict'

const { validate } = use('Validator')
const Task = use('App/Models/Task')

class TaskController {
  /**
   * Show all tasks
   *
   * @returns {Task[]}
   * @memberof TaskController
   */
  async index() {
    return await Task.query()
      .with('project', builder => {
        builder.select('id', 'name', 'color')
      })
      .with('owner', builder => {
        builder.select('id', 'first_name', 'last_name')
      })
      .with('assignee', builder => {
        builder.select('id', 'first_name', 'last_name')
      })
      .fetch()
  }

  /**
   * Store task
   *
   * @param {*} { request, response, auth }
   * @returns {response}
   * @memberof TaskController
   */
  async store({ request, response, auth }) {
    const user = await auth.getUser()
    const {
      name,
      description,
      assignee_id,
      project_id,
      due_date
    } = request.all()

    await validate({
      name: 'required|max:256',
      description: 'max:1000',
      assignee_id: 'required|integer',
      project_id: 'required|integer',
      due_date: 'date'
    })

    const task = new Task()
    task.fill({
      name,
      description,
      assignee_id,
      project_id,
      due_date
    })
    await user.ownedTasks().save(task)

    return response.status(201).json({ message: 'Task created' })
  }

  /**
   * Show task
   *
   * @param {*} { params }
   * @returns {Task}
   * @memberof TaskController
   */
  async show({ params }) {
    const task = await Task.find(params.task)
    await task.loadMany({
      project: builder => builder.select('id', 'name', 'color'),
      owner: builder => builder.select('id', 'first_name', 'last_name'),
      assignee: builder => builder.select('id', 'first_name', 'last_name')
    })

    return task
  }

  /**
   * Update existing task
   *
   * @param {*} { params, request, response }
   * @returns {response}
   * @memberof TaskController
   */
  async update({ params, request, response }) {
    const task = await Task.find(params.task)
    const {
      name,
      description,
      assignee_id,
      project_id,
      due_date
    } = request.all()

    await validate({
      name: 'required|max:256',
      description: 'max:1000',
      assignee_id: 'required|integer',
      project_id: 'required|integer',
      due_date: 'date'
    })

    task.merge({ name, description, assignee_id, project_id, due_date })
    await task.save()

    return response.status(200).json({ message: 'Task updated' })
  }

  /**
   * Delete task
   *
   * @param {*} { params, response }
   * @returns {response}
   * @memberof TaskController
   */
  async destroy({ params, response }) {
    const task = await Task.find(params.task)
    await task.delete()

    return response.status(200).json({ message: 'Task deleted' })
  }

  /**
   * Show tasks by assignee_id
   *
   * @param {*} { params }
   * @returns {Task[]}
   * @memberof TaskController
   */
  async assignee({ params }) {
    return await Task.query()
      .where('assignee_id', params.user)
      .with('project', builder => {
        builder.select('id', 'name', 'color')
      })
      .with('owner', builder => {
        builder.select('id', 'first_name', 'last_name')
      })
      .with('assignee', builder => {
        builder.select('id', 'first_name', 'last_name')
      })
      .fetch()
  }

  /**
   * Show tasks by project_id
   *
   * @param {*} { params }
   * @returns {Task[]}
   * @memberof TaskController
   */
  async project({ params }) {
    return await Task.query()
      .where('project_id', params.project)
      .with('project', builder => {
        builder.select('id', 'name', 'color')
      })
      .with('owner', builder => {
        builder.select('id', 'first_name', 'last_name')
      })
      .with('assignee', builder => {
        builder.select('id', 'first_name', 'last_name')
      })
      .fetch()
  }

  /**
   * Complete task
   *
   * @param {*} { params, response }
   * @returns {response}
   * @memberof TaskController
   */
  async complete({ params, response }) {
    const task = await Task.find(params.task)

    task.merge({ completed: true })
    await task.save()

    return response.status(200).json({ message: 'Task completed' })
  }
}

module.exports = TaskController
