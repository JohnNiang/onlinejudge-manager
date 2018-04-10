import service from '../utils/service'

const baseUrl = '/api/v1/problems'

export function createProblem(problem) {
  return service({
    url: baseUrl,
    data: problem,
    method: 'post'
  })
}
