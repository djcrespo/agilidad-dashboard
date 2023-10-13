import request from './config'

export const getTypeProjects = () => {
  return request({
    url: '/type-projects/',
    method: 'GET'
  })
}

export const createTypeProject = (data) => {
  return request({
    url: '/type-projects/',
    method: 'POST',
    data
  })
}

export const readTypeProject = (id) => {
  return request({
    url: `/type-projects/${id}/`,
    method: 'GET'
  })
}

export const deleteTypeProject = (id) => {
  return request({
    url: `/type-projects/${id}/`,
    method: 'DELETE'
  })
}

export const updatePartialTypeProject = (id, data) => {
  return request({
    url: `/type-projects/${id}/`,
    method: 'PATCH',
    data
  })
}

export const updateAllTypeProject = (id, data) => {
  return request({
    url: `/type-projects/${id}/`,
    method: 'PUT',
    data
  })
}
