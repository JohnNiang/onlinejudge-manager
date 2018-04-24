import service from '../utils/service'

const baseUrl = '/api/v1/problems'

const problemApi = {}

problemApi.createProblem = problem => {
  return service({
    url: baseUrl,
    data: problem,
    method: 'post'
  })
}

problemApi.getProblems = (page, rpp, sort) => {
  return service({
    url: baseUrl,
    params: {
      page: page,
      rpp: rpp,
      sort: sort
    },
    method: 'get'
  })
}

problemApi.getProblem = id => {
  return service({
    url: `${baseUrl}/${id}`,
    method: 'get'
  })
}

problemApi.uploadFiles = (problemId, formData, uploadProgress) => {
  return service({
    url: `${baseUrl}/${problemId}/datas/upload`,
    data: formData,
    method: 'post',
    onUploadProgress: uploadProgress
  })
}

export default problemApi
