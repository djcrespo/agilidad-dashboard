import request from './config'

export const getTypeResources = () => {
  return request({
    url: '/type-resources/',
    method: 'GET'
  })
}

export const createTypeResource = (data) => {
  return request({
    url: '/type-resources/',
    method: 'POST',
    data
  })
}

export const readTypeResource = (id) => {
  return request({
    url: `/type-resources/${id}/`,
    method: 'GET'
  })
}

export const deleteTypeResource = (id) => {
  return request({
    url: `/type-resources/${id}/`,
    method: 'DELETE'
  })
}

export const updatePartialTypeResource = (id, data) => {
  return request({
    url: `/type-resources/${id}/`,
    method: 'PATCH',
    data
  })
}

export const updateAllTypeResource = (id, data) => {
  return request({
    url: `/type-resources/${id}/`,
    method: 'PUT',
    data
  })
}
