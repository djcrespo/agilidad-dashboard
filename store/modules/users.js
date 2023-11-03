import { getUsers, updateUser, createUser, deleteUser } from '~/api/users'
import { getGroups } from '~/api/groups'

export const actions = {
  async getUsersByLicense ({ commit }, query) {
    const res = await getUsers(query)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updateUser(data.id, data)
      return res.id
    } else {
      const res = await createUser(data)
      return res.id
    }
  },
  async getGroupsList ({ commit }, query) {
    const res = await getGroups(query)
    return res
  },
  async getUsers ({ commit }, query) {
    const res = await getUsers(query)
    return res
  },
  async deleteUser ({ commit }, id) {
    const res = await deleteUser(id)
    return res
  }
}
