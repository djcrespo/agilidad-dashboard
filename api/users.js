import request from './config'

export const updateUser = (id, data) => {
  return request({
    url: '/users/' + id + '/',
    method: 'PUT',
    data
  })
}

export const getUsers = params => {
  return request({
    url: '/users/',
    method: 'GET',
    params
  })
}

export const createUser = data => {
  return request({
    url: '/users/',
    method: 'POST',
    data: {
      ...data,
      is_active: true
    }
  })
}

export const deleteUser = id => {
  return request({
    url: '/users/' + id + '/',
    method: 'DELETE'
  })
}
