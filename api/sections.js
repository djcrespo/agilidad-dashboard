import request from './config'

export const getSections = () => {
  return request({
    url: '/sections/',
    method: 'GET'
  })
}

export const createSection = (data) => {
  return request({
    url: '/sections/',
    method: 'POST',
    data
  })
}

export const readSection = (id) => {
  return request({
    url: `/sections/${id}/`,
    method: 'GET'
  })
}

export const deleteSection = (id) => {
  return request({
    url: `/sections/${id}/`,
    method: 'DELETE'
  })
}

export const updatePartialSection = (id, data) => {
  return request({
    url: `/sections/${id}/`,
    method: 'PATCH',
    data
  })
}

export const updateAllSection = (id, data) => {
  return request({
    url: `/sections/${id}/`,
    method: 'PUT',
    data
  })
}
