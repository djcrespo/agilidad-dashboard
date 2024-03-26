import { getProjects, createProject, readProject, deleteProject, updatePartialProject, updateAllProject } from '~/api/projects'

export const actions = {
  async getProjectById ({ commit }, id) {
    const res = await readProject(id)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updatePartialProject(data.id, data)
      return res
    } else {
      const res = await createProject(data)
      return res
    }
  },
  async getProjects ({ commit }, query) {
    const res = await getProjects(query)
    return res
  },
  async updateAllProject ({ commit }, data) {
    const res = await updateAllProject(data.id, data)
    return res
  },
  async deleteProject ({ commit }, id) {
    const res = await deleteProject(id)
    return res
  }
}
