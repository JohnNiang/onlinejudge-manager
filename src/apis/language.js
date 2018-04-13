import service from '../utils/service'

const baseUrl = '/api/v1/languages'

export function createLanguage(language) {
  return service({
    url: baseUrl,
    data: language,
    method: 'post'
  })
}

export function getLanguages() {
  return service({
    url: baseUrl,
    method: 'get'
  })
}

export function deleteLanguage(languageId) {
  return service({
    url: `${baseUrl}/${languageId}`,
    method: 'delete'
  })
}

export function updateLanguage(languageId, language) {
  return service({
    url: `${baseUrl}/${languageId}`,
    data: language,
    method: 'put'
  })
}

export function enableLanguage(languageId) {
  return service({
    url: `${baseUrl}/${languageId}/status/enable`,
    method: 'put'
  })
}

export function diableLanguage(languageId) {
  return service({
    url: `${baseUrl}/${languageId}/status/disable`,
    method: 'put'
  })
}
