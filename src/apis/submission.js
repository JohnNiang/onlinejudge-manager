import service from '../utils/service'

const baseUrl = '/api/v1/submissions'

const submissionApi = {}

submissionApi.count = () => {
  return service({
    url: `${baseUrl}/count`,
    method: 'get'
  })
}

submissionApi.countToday = () => {
  return service({
    url: `${baseUrl}/count/today`,
    method: 'get'
  })
}

export default submissionApi
