import request from './config'

export const getGenerators = () => {
  return request({
    url: '/generators/',
    method: 'GET'
  })
}

export const createGenerator = (data) => {
  return request({
    url: '/generators/',
    method: 'POST',
    data
  })
}

export const readGenerator = (id) => {
  return request({
    url: `/generators/${id}/`,
    method: 'GET'
  })
}

export const deleteGenerator = (id) => {
  return request({
    url: `/generators/${id}/`,
    method: 'DELETE'
  })
}

export const updatePartialGenerator = (id, data) => {
  return request({
    url: `/generators/${id}/`,
    method: 'PATCH',
    data
  })
}

export const updateAllGenerator = (id, data) => {
  return request({
    url: `/generators/${id}/`,
    method: 'PUT',
    data
  })
}
