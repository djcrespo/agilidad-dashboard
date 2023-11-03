import { getSectionsProjects, getInstanceSectionsProject, createSectionsProject, readSectionsProject, deleteSectionsProject, updatePartialSectionsProject, updateAllSectionsProject } from '~/api/sectionsProject'

export const actions = {
  async getProjectById ({ commit }, id) {
    const res = await readSectionsProject(id)
    return res
  },
  async createOrUpdate ({ commit }, data) {
    if (data.id) {
      const res = await updatePartialSectionsProject(data.id, data)
      return res.id
    } else {
      const res = await createSectionsProject(data)
      return res.id
    }
  },
  async getSectionsProjects ({ commit }, query) {
    const res = await getSectionsProjects(query)
    return res
  },
  async getInstanceSectionsProject ({ commit }, id) {
    const res = await getInstanceSectionsProject(id)
    return res
  },
  async updateAllSectionsProject ({ commit }, data) {
    const res = await updateAllSectionsProject(data.id, data)
    return res
  },
  async deleteSectionsProject ({ commit }, id) {
    const res = await deleteSectionsProject(id)
    return res
  }
}
