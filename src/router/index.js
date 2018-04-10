import Vue from 'vue'
import Router from 'vue-router'

const Main = resolve => require(['@/views/main/Main'], resolve)
const Index = resolve => require(['@/views/index/Index'], resolve)
const ProblemCreate = resolve =>
  require(['@/views/problem/ProblemCreate'], resolve)
const ContestCreate = resolve =>
  require(['@/views/contest/ContestCreate'], resolve)
const Login = resolve => require(['@/views/auth/Login'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      redirect: 'home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: Index
        },
        {
          path: 'problems/create',
          name: 'problem_create',
          component: ProblemCreate
        },
        {
          path: '/contests/create',
          name: 'contest_create',
          component: ContestCreate
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
