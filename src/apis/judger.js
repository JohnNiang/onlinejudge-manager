import service from '../utils/service'

const baseUrl = '/api/v1/judger'

const judgerApi = {}

judgerApi.getJudgerInfo = () => {
  return service({
    url: baseUrl,
    method: 'get'
  })
}

export default judgerApi
