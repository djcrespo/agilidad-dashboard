import { getRelations, createRelations, readRelations, deleteRelations, updatePartialRelations, updateAllRelations } from '~/api/projectGenerator'

export const actions = {
  async getRelationsById ({ commit }, id) {
    const res = await readRelations(id)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updatePartialRelations(data.id, data)
      return res.id
    } else {
      const res = await createRelations(data)
      return res.id
    }
  },
  async getRelations ({ commit }, query) {
    const res = await getRelations(query)
    return res
  },
  async updateAllRelations ({ commit }, data) {
    const res = await updateAllRelations(data.id, data)
    return res
  },
  async deleteRelations ({ commit }, id) {
    const res = await deleteRelations(id)
    return res
  }
}
