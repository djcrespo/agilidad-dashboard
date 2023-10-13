import { getTypeResources, createTypeResource, readTypeResource, deleteTypeResource, updatePartialTypeResource, updateAllTypeResource } from '~/api/resourcesType'

export const actions = {
  async getTypeResourceById ({ commit }, id) {
    const res = await readTypeResource(id)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updatePartialTypeResource(data.id, data)
      return res.id
    } else {
      const res = await createTypeResource(data)
      return res.id
    }
  },
  async getTypeResources ({ commit }, query) {
    const res = await getTypeResources(query)
    return res
  },
  async updateAllTypeResource ({ commit }, data) {
    const res = await updateAllTypeResource(data.id, data)
    return res
  },
  async deleteTypeResource ({ commit }, id) {
    const res = await deleteTypeResource(id)
    return res
  }
}
