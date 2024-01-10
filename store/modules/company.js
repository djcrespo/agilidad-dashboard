import { getCompanies, createCompany, deleteCompany, readCompany, updatePartialCompany } from '~/api/company'

export const actions = {
  async getCompanyById ({ commit }, id) {
    const res = await readCompany(id)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updatePartialCompany(data.id, data)
      return res.id
    } else {
      const res = await createCompany(data)
      return res.id
    }
  },
  async getCompanies ({ commit }, query) {
    const res = await getCompanies(query)
    return res
  },
  async deleteCompany ({ commit }, id) {
    const res = await deleteCompany(id)
    return res
  }
}
