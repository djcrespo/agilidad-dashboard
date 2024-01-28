import { updateLicitations } from '~/api/licitations'

export const actions = {
  async updateLicitations ({ commit }, data) {
    const res = await updateLicitations(data.projectId, data)
    return res
  }
}
