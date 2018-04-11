import service from '../utils/service'

const baseUrl = '/api/v1/bulletins'

export function createBulletin(bulletin) {
  return service({
    url: baseUrl,
    data: bulletin,
    method: 'post'
  })
}
