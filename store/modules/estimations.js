import { getEstimations, createEstimations, updateEstimations, deleteEstimationsProject, getEstimationsProject } from '~/api/estimations'

export const actions = {
  async getAllEstimations ({ commit }, query) {
    const res = await getEstimations(query)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updateEstimations(data.id, data)
      return res
    } else {
      const res = await createEstimations(data)
      return res
    }
  },
  async deleteEstimationsProject ({ commit }, id) {
    const res = await deleteEstimationsProject(id)
    return res
  },
  async viewEstimationsProject ({ commit }, id) {
    const res = await getEstimationsProject(id)
    return res
  }
}
