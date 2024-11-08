import request from './config'

export const getEstimations = (params) => {
  return request({
    url: '/estimations-project/',
    method: 'GET',
    params
  })
}

export const createEstimations = (data) => {
  return request({
    url: '/estimations-project/',
    method: 'POST',
    data
  })
}

export const deleteEstimationsProject = (id) => {
  return request({
    url: `/estimations-project/${id}/`,
    method: 'DELETE'
  })
}

export const getEstimationsProject = (id) => {
  return request({
    url: `/estimations-project/${id}/`,
    method: 'GET'
  })
}

export const getEstimation = (id) => {
  return request({
    url: `/estimations/${id}/`,
    method: 'GET'
  })
}

export const uploadDocument = (id, data) => {
  return request({
    url: `/estimations-project/${id}/extract_data/`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
