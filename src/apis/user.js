import service from '../utils/service'

const baseUrl = '/api/v1/users'

export function getUsers(page, rpp, sort) {
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
