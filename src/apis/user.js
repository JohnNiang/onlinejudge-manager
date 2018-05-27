import service from '../utils/service'

const baseUrl = '/api/v1/users'

const userApi = {}

userApi.count = () => {
  return service({
    url: `${baseUrl}/count`,
    method: 'get'
  })
}

userApi.getUsers = pagination => {
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

export default userApi
