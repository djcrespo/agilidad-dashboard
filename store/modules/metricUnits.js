import { getMetricUnits, createMetricUnit, readMetricUnit, deleteMetricUnit, updatePartialMetricUnit, updateAllMetricUnit } from '~/api/metricUnits'

export const actions = {
  async getMetricUnitById ({ commit }, id) {
    const res = await readMetricUnit(id)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updatePartialMetricUnit(data.id, data)
      return res.id
    } else {
      const res = await createMetricUnit(data)
      return res.id
    }
  },
  async getMetricUnits ({ commit }, query) {
    const res = await getMetricUnits(query)
    return res
  },
  async updateAllMetricUnit ({ commit }, data) {
    const res = await updateAllMetricUnit(data.id, data)
    return res
  },
  async deleteMetricUnit ({ commit }, id) {
    const res = await deleteMetricUnit(id)
    return res
  }
}
