'use strict'

const { validate } = use('Validator')
const Project = use('App/Models/Project')

class ProjectController {
  /**
   * Show non-archived projects
   *
   * @returns {Project[]}
   * @memberof ProjectController
   */
  async index() {
    return await Project.query()
      .where('archived', false)
      .withCount('tasks')
      .fetch()
  }

  /**
   * Show project
   *
   * @param {*} { params }
   * @returns {Project}
   * @memberof ProjectController
   */
  async show({ params }) {
    return await Project.find(params.project)
  }

  /**
   * Store project
   *
   * @param {*} { request, response, auth }
   * @returns {response}
   * @memberof ProjectController
   */
  async store({ request, response, auth }) {
    const user = await auth.getUser()
    const { name, description, color } = request.all()

    await validate({
      name: 'required|max:256',
      description: 'max:1000',
      color: 'required|max:7'
    })

    const project = new Project()
    project.fill({
      name,
      description,
      color
    })
    await user.ownedProjects().save(project)

    return response.status(201).json({ message: 'Project created' })
  }

  /**
   * Update project
   *
   * @param {*} { params, request, response }
   * @returns {response}
   * @memberof ProjectController
   */
  async update({ params, request, response }) {
    const project = await Project.find(params.project)
    const { name, description, color } = request.all()

    await validate({
      name: 'required|max:256',
      description: 'max:1000',
      color: 'required|max:7'
    })

    project.merge({
      name,
      description,
      color
    })
    await project.save()

    return response.status(200).json({ message: 'Project updated' })
  }

  /**
   * Archive project
   *
   * @param {*} { params, response }
   * @returns {response}
   * @memberof ProjectController
   */
  async archive({ params, response, auth }) {
    const project = await Project.find(params.project)

    project.merge({ archived: true })
    await project.save()

    return response.status(200).json({ message: 'Project archived' })
  }
}

module.exports = ProjectController
