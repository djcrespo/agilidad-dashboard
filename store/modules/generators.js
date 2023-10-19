import { getGenerators, createGenerator, readGenerator, deleteGenerator, updatePartialGenerator, updateAllGenerator } from '~/api/generators'

export const actions = {
  async getGeneratorById ({ commit }, id) {
    const res = await readGenerator(id)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updatePartialGenerator(data.id, data)
      return res.id
    } else {
      const res = await createGenerator(data)
      return res.id
    }
  },
  async getGenerators ({ commit }, query) {
    const res = await getGenerators(query)
    return res
  },
  async updateAllGenerator ({ commit }, data) {
    const res = await updateAllGenerator(data.id, data)
    return res
  },
  async deleteGenerator ({ commit }, id) {
    const res = await deleteGenerator(id)
    return res
  }
}
