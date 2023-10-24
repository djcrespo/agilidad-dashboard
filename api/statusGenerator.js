import request from './config'

export const getStatuses = () => {
  return request({
    url: '/status-generator/',
    method: 'GET'
  })
}

export const createStatus = (data) => {
  return request({
    url: '/status-generator/',
    method: 'POST',
    data
  })
}

export const readStatus = (id) => {
  return request({
    url: `/status-generator/${id}/`,
    method: 'GET'
  })
}

export const deleteStatus = (id) => {
  return request({
    url: `/status-generator/${id}/`,
    method: 'DELETE'
  })
}

export const updatePartialStatus = (id, data) => {
  return request({
    url: `/status-generator/${id}/`,
    method: 'PATCH',
    data
  })
}

export const updateAllStatus = (id, data) => {
  return request({
    url: `/status-generator/${id}/`,
    method: 'PUT',
    data
  })
}
