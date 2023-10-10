import request from './config'

export const getContractors = () => {
  return request({
    url: '/contractors/',
    method: 'GET'
  })
}

export const createContractor = (data) => {
  return request({
    url: '/contractors/',
    method: 'POST',
    data
  })
}

export const readContractor = (id) => {
  return request({
    url: `/contractors/${id}/`,
    method: 'GET'
  })
}

export const deleteContractor = (id) => {
  return request({
    url: `/contractors/${id}/`,
    method: 'DELETE'
  })
}

export const updatePartialContractor = (id, data) => {
  return request({
    url: `/contractors/${id}/`,
    method: 'PATCH',
    data
  })
}

export const updateAllContractor = (id, data) => {
  return request({
    url: `/contractors/${id}/`,
    method: 'PUT',
    data
  })
}
