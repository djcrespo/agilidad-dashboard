import request from './config'

export const getMetricUnits = () => {
  return request({
    url: '/metric-unit/',
    method: 'GET'
  })
}

export const createMetricUnit = (data) => {
  return request({
    url: '/metric-unit/',
    method: 'POST',
    data
  })
}

export const readMetricUnit = (id) => {
  return request({
    url: `/metric-unit/${id}/`,
    method: 'GET'
  })
}

export const deleteMetricUnit = (id) => {
  return request({
    url: `/metric-unit/${id}/`,
    method: 'DELETE'
  })
}

export const updatePartialMetricUnit = (id, data) => {
  return request({
    url: `/metric-unit/${id}/`,
    method: 'PATCH',
    data
  })
}

export const updateAllMetricUnit = (id, data) => {
  return request({
    url: `/metric-unit/${id}/`,
    method: 'PUT',
    data
  })
}
