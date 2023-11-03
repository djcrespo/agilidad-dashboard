import { getGroups } from '~/api/groups'

export const actions = {
  async getGroups ({ commit }, query) {
    const res = await getGroups(query)
    return res
  }
}
