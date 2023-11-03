import { getSections, createSection, readSection, deleteSection, updatePartialSection, updateAllSection } from '~/api/sections'

export const actions = {
  async getProjectById ({ commit }, id) {
    const res = await readSection(id)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updatePartialSection(data.id, data)
      return res.id
    } else {
      const res = await createSection(data)
      return res.id
    }
  },
  async getSections ({ commit }, query) {
    const res = await getSections(query)
    return res
  },
  async updateAllSection ({ commit }, data) {
    const res = await updateAllSection(data.id, data)
    return res
  },
  async deleteSection ({ commit }, id) {
    const res = await deleteSection(id)
    return res
  }
}
