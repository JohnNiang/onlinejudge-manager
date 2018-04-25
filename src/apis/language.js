import service from '../utils/service'

const baseUrl = '/api/v1/languages'

const languageApi = {}

languageApi.createLanguage = language => {
  return service({
    url: baseUrl,
    data: language,
    method: 'post'
  })
}

languageApi.getLanguages = () => {
  return service({
    url: baseUrl,
    method: 'get'
  })
}

languageApi.deleteLanguage = languageId => {
  return service({
    url: `${baseUrl}/${languageId}`,
    method: 'delete'
  })
}

languageApi.updateLanguage = (languageId, language) => {
  return service({
    url: `${baseUrl}/${languageId}`,
    data: language,
    method: 'put'
  })
}

languageApi.enableLanguage = languageId => {
  return service({
    url: `${baseUrl}/${languageId}/status/enable`,
    method: 'put'
  })
}

languageApi.diableLanguage = languageId => {
  return service({
    url: `${baseUrl}/${languageId}/status/disable`,
    method: 'put'
  })
}

export default languageApi
