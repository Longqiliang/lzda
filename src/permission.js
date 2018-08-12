import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if(getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.organizes.length === 0) {
        store.dispatch('GetOrganize').then(v => {
          next({ ...to, replace: true })
        }).catch(err => {
          if(err){
            next('/login')
          }
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})
