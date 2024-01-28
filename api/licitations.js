import request from './config'

export const updateLicitations = (projectId, data) => {
  return request({
    url: `/licitations/${projectId}/licitation_asign/`,
    method: 'POST',
    data
  })
}
