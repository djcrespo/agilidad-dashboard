import { getTypeProjects, createTypeProject, readTypeProject, deleteTypeProject, updatePartialTypeProject, updateAllTypeProject } from '~/api/projectsType'

export const actions = {
  async getTypeProjectById ({ commit }, id) {
    const res = await readTypeProject(id)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updatePartialTypeProject(data.id, data)
      return res.id
    } else {
      const res = await createTypeProject(data)
      return res.id
    }
  },
  async getTypeProjects ({ commit }, query) {
    const res = await getTypeProjects(query)
    return res
  },
  async updateAllTypeProject ({ commit }, data) {
    const res = await updateAllTypeProject(data.id, data)
    return res
  },
  async deleteTypeProject ({ commit }, id) {
    const res = await deleteTypeProject(id)
    return res
  }
}
