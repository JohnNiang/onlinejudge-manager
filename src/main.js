// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import App from './App'
import router from './router'
import store from './store'
import * as filter from './utils/filter'

// import the ngrogress style
import 'nprogress/nprogress.css' // Progress 进度条样式

// import iview style
import 'iview/dist/styles/iview.css'

// import custom components
import './components'

Vue.config.productionTip = false

Vue.use(iView)

// import filter
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
