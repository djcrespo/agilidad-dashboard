import request from './config'

export const getProjectInfos = (params) => {
  return request({
    url: '/project-info/',
    method: 'GET',
    params
  })
}

export const createProjectInfo = (data) => {
  return request({
    url: '/project-info/',
    method: 'POST',
    data
  })
}

export const readProjectInfo = (id) => {
  return request({
    url: `/project-info/${id}/`,
    method: 'GET'
  })
}

export const deleteProjectInfo = (id) => {
  return request({
    url: `/project-info/${id}/`,
    method: 'DELETE'
  })
}

export const updatePartialProjectInfo = (id, data) => {
  return request({
    url: `/project-info/${id}/`,
    method: 'PATCH',
    data
  })
}

export const updateAllProjectInfo = (id, data) => {
  return request({
    url: `/project-info/${id}/`,
    method: 'PUT',
    data
  })
}
