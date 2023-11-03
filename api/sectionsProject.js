import request from './config'

export const getSectionsProjects = () => {
  return request({
    url: '/sections-project/',
    method: 'GET'
  })
}

export const createSectionsProject = (data) => {
  return request({
    url: '/sections-project/',
    method: 'POST',
    data
  })
}

export const readSectionsProject = (id) => {
  return request({
    url: `/sections-project/${id}/`,
    method: 'GET'
  })
}

export const getInstanceSectionsProject = (project) => {
  return request({
    url: `/sections-project/${project}/get_sections_project/`,
    method: 'GET'
  })
}

export const deleteSectionsProject = (id) => {
  return request({
    url: `/sections-project/${id}/`,
    method: 'DELETE'
  })
}

export const updatePartialSectionsProject = (id, data) => {
  return request({
    url: `/sections-project/${id}/`,
    method: 'PATCH',
    data
  })
}

export const updateAllSectionsProject = (id, data) => {
  return request({
    url: `/sections-project/${id}/`,
    method: 'PUT',
    data
  })
}
