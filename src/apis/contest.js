import service from '../utils/service'

const baseUrl = '/api/v1/contests'

const contestApi = {}

contestApi.getContests = pagination => {
  return service({
    url: baseUrl,
    params: {
      page: pagination.page,
      rpp: pagination.rpp,
      sort: pagination.sort
    },
    method: 'get'
  })
}

contestApi.getContest = contestId => {
  return service({
    url: `${baseUrl}/${contestId}`,
    method: 'get'
  })
}

contestApi.createContest = contest => {
  return service({
    url: baseUrl,
    data: contest,
    method: 'post'
  })
}

export default contestApi
