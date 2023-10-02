import request from './config'

export const getProjects = () => {
  return request({
    url: '/projects/',
    method: 'GET'
  })
}

export const createProject = (data) => {
  return request({
    url: '/projects/',
    method: 'POST',
    data
  })
}

export const readProject = (id) => {
  return request({
    url: `/projects/${id}`,
    method: 'GET'
  })
}

export const deleteProject = (id) => {
  return request({
    url: `/projects/${id}`,
    method: 'DELETE'
  })
}

export const updatePartialProject = (id, data) => {
  return request({
    url: `/projects/${id}`,
    method: 'PATCH',
    data
  })
}

export const updateAllProject = (id, data) => {
  return request({
    url: `/projects/${id}`,
    method: 'PUT',
    data
  })
}
