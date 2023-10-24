import { getStatuses, createStatus, readStatus, deleteStatus, updatePartialStatus, updateAllStatus } from '~/api/statusGenerator'

export const actions = {
  async getStatusById ({ commit }, id) {
    const res = await readStatus(id)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updatePartialStatus(data.id, data)
      return res.id
    } else {
      const res = await createStatus(data)
      return res.id
    }
  },
  async getStatuses ({ commit }, query) {
    const res = await getStatuses(query)
    return res
  },
  async updateAllStatus ({ commit }, data) {
    const res = await updateAllStatus(data.id, data)
    return res
  },
  async deleteStatus ({ commit }, id) {
    const res = await deleteStatus(id)
    return res
  }
}
