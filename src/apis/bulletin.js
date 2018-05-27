import service from '../utils/service'

const baseUrl = '/api/v1/bulletins'

const bulletinApi = {}

bulletinApi.count = () => {
  return service({
    url: `${baseUrl}/count`,
    method: 'get'
  })
}

bulletinApi.createBulletin = bulletin => {
  return service({
    url: baseUrl,
    data: bulletin,
    method: 'post'
  })
}

export default bulletinApi
