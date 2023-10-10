import { getContractors, createContractor, readContractor, deleteContractor, updatePartialContractor, updateAllContractor } from '~/api/contractors'

export const actions = {
  async getContractorById ({ commit }, id) {
    const res = await readContractor(id)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updatePartialContractor(data.id, data)
      return res.id
    } else {
      const res = await createContractor(data)
      return res.id
    }
  },
  async getContractors ({ commit }, query) {
    const res = await getContractors(query)
    return res
  },
  async updateAllContractor ({ commit }, data) {
    const res = await updateAllContractor(data.id, data)
    return res
  },
  async deleteContractor ({ commit }, id) {
    const res = await deleteContractor(id)
    return res
  }
}
