import { getProjectInfos, createProjectInfo, readProjectInfo, deleteProjectInfo, updatePartialProjectInfo, updateAllProjectInfo } from '~/api/projectInfo'

export const actions = {
  async getProjectInfoById ({ commit }, id) {
    const res = await readProjectInfo(id)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updatePartialProjectInfo(data.id, data)
      return res.id
    } else {
      const res = await createProjectInfo(data)
      return res.id
    }
  },
  async getProjectInfos ({ commit }, query) {
    const res = await getProjectInfos(query)
    return res
  },
  async updateAllProjectInfo ({ commit }, data) {
    const res = await updateAllProjectInfo(data.id, data)
    return res
  },
  async deleteProjectInfo ({ commit }, id) {
    const res = await deleteProjectInfo(id)
    return res
  }
}
