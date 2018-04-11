import service from '../utils/service'

const baseUrl = '/api/v1/languages'

export function createLanguage(language) {
  return service({
    url: baseUrl,
    data: language,
    method: 'post'
  })
}
