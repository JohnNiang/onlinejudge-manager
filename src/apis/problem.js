import service from '../utils/service'

const baseUrl = '/api/v1/problems'

export function createProblem(problem) {
  return service({
    url: baseUrl,
    data: problem,
    method: 'post'
  })
}

export function uploadFiles(problemId, formData, uploadProgress) {
  return service({
    url: `${baseUrl}/${problemId}/datas/upload`,
    data: formData,
    method: 'post',
    onUploadProgress: uploadProgress
  })
}
