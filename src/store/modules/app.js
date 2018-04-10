import * as type from '../mutation-type'

const state = {
  currentPath: [
    {
      title: 'Home',
      path: '/',
      name: 'home'
    }
  ] // breadcrumb array
}

const getters = {
  currentPath: state => state.currentPath
}

const mutations = {
  [type.SET_CURRENT_PATH](state, pathArr) {
    state.currentPath = pathArr
  }
}

const actions = {}

export default { state, getters, mutations, actions }
