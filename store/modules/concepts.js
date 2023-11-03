import { getConcepts, createConcept, readConcept, deleteConcept, updatePartialConcept, updateAllConcept, readConceptsProject } from '~/api/concepts'

export const actions = {
  async getConceptById ({ commit }, id) {
    const res = await readConcept(id)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updatePartialConcept(data.id, data)
      return res.id
    } else {
      const res = await createConcept(data)
      return res.id
    }
  },
  async getConcepts ({ commit }, query) {
    const res = await getConcepts(query)
    return res
  },
  async updateAllConcept ({ commit }, data) {
    const res = await updateAllConcept(data.id, data)
    return res
  },
  async deleteConcept ({ commit }, id) {
    const res = await deleteConcept(id)
    return res
  },
  async getConceptsProjectById ({ commit }, id) {
    const res = await readConceptsProject(id)
    return res
  }
}
