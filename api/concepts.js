import request from './config'

export const getConcepts = () => {
  return request({
    url: '/concepts/',
    method: 'GET'
  })
}

export const createConcept = (data) => {
  return request({
    url: '/concepts/',
    method: 'POST',
    data
  })
}

export const readConcept = (id) => {
  return request({
    url: `/concepts/${id}/`,
    method: 'GET'
  })
}

export const deleteConcept = (id) => {
  return request({
    url: `/concepts/${id}/`,
    method: 'DELETE'
  })
}

export const updatePartialConcept = (id, data) => {
  return request({
    url: `/concepts/${id}/`,
    method: 'PATCH',
    data
  })
}

export const updateAllConcept = (id, data) => {
  return request({
    url: `/concepts/${id}/`,
    method: 'PUT',
    data
  })
}

// Conceptos por proyecto

export const readConceptsProject = (params) => {
  return request({
    url: '/concepts-project/',
    method: 'GET',
    params
  })
}
