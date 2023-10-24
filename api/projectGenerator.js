import request from './config'

export const getRelations = () => {
  return request({
    url: '/project-generator/',
    method: 'GET'
  })
}

export const createRelations = (data) => {
  return request({
    url: '/project-generator/',
    method: 'POST',
    data
  })
}

export const readRelations = (id) => {
  return request({
    url: `/project-generator/${id}/`,
    method: 'GET'
  })
}

export const deleteRelations = (id) => {
  return request({
    url: `/project-generator/${id}/`,
    method: 'DELETE'
  })
}

export const updatePartialRelations = (id, data) => {
  return request({
    url: `/project-generator/${id}/`,
    method: 'PATCH',
    data
  })
}

export const updateAllRelations = (id, data) => {
  return request({
    url: `/project-generator/${id}/`,
    method: 'PUT',
    data
  })
}
