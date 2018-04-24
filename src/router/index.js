import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'

const Main = resolve => require(['@/views/main/Main'], resolve)
const Index = resolve => require(['@/views/index/Index'], resolve)
const ProblemCreate = resolve =>
  require(['@/views/problem/ProblemCreate'], resolve)
const ProblemCheck = resolve =>
  require(['@/views/problem/ProblemCheck'], resolve)
const ContestCreate = resolve =>
  require(['@/views/contest/ContestCreate'], resolve)
const BulletinCreate = resolve =>
  require(['@/views/bulletin/BulletinCreate'], resolve)
const LanguageCheck = resolve =>
  require(['@/views/language/LanguageCheck'], resolve)
const UserCheck = resolve => require(['@/views/user/UserCheck'], resolve)
const Login = resolve => require(['@/views/auth/Login'], resolve)

Vue.use(Router)

const router = new Router({
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
          path: 'problems/check',
          name: 'problem_check',
          component: ProblemCheck
        },
        {
          path: 'contests/create',
          name: 'contest_create',
          component: ContestCreate
        },
        {
          path: 'bulletins/create',
          name: 'bulletin_create',
          component: BulletinCreate
        },
        {
          path: 'languages/check',
          name: 'language_check',
          component: LanguageCheck
        },
        {
          path: 'users/check',
          name: 'user_check',
          component: UserCheck
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

export default router
