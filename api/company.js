import request from './config'

export const getCompanies = () => {
  return request({
    url: '/company/',
    method: 'GET'
  })
}

export const createCompany = (data) => {
  return request({
    url: '/company/',
    method: 'POST',
    data
  })
}

export const deleteCompany = (id) => {
  return request({
    url: `/company/${id}/`,
    method: 'DELETE'
  })
}

export const readCompany = (id) => {
  return request({
    url: `/company/${id}/`,
    method: 'GET'
  })
}

export const updatePartialCompany = (id, data) => {
  return request({
    url: `/company/${id}/`,
    method: 'PATCH',
    data
  })
}
