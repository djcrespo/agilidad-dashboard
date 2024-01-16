import request from './config'

export const getRelations = (params) => {
  return request({
    url: '/project-generator/',
    method: 'GET',
    params
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

export const updateStatus = (id, data) => {
  return request({
    url: `/project-generator/${id}/update_status/`,
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
