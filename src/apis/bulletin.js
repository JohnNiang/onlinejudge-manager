import service from '../utils/service'

const baseUrl = '/api/v1/bulletins'

const bulletinApi = {}

bulletinApi.createBulletin = bulletin => {
  return service({
    url: baseUrl,
    data: bulletin,
    method: 'post'
  })
}

export default bulletinApi
