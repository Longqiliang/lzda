import Vue from 'vue'
import Router from 'vue-router'
import LayOut from '@/components/layout/LayOut'
import Main from '@/components/Main/Main'
import QuestionTable from '@/components/Table/QuestionTable'
import UserInfoTable from '@/components/Table/UserInfoTable'
import SuperviseTable from '@/components/Table/SuperviseTable'
import ReportTable from '@/components/Table/ReportTable'
import IncorruptTable from '@/components/Table/IncorruptTable'
Vue.use(Router)

function propsFn(route) {
  return {
    type: route.query.id
  }
}

const router = new Router({
  routes: [{
      path: '/',
      name: 'Index',
      meta: {
        title: '首页',
        icon: 'index'
      },
      component: LayOut
    },
    {
      path: '/information',
      redirect: '/information/index',
      meta: {
        title: '个人信息',
        icon: 'userInfo',
        dialog: 'UserInfo'
      },
      component: LayOut,
      children: [{
        path: '/information/:type',
        component: Main,
        props: propsFn,
        children: [{
          path: '',
          component: UserInfoTable,
          props: propsFn
        }]
      }]
    },
    {
      path: '/portrayal',
      meta: {
        title: '人物画像',
        icon: 'portrayal'
      },
      component: LayOut,
      children: [{
        path: '/',
        component: Main
      }]
    },
    {
      path: '/question',
      redirect: '/question/all',
      meta: {
        title: '问题与惩戒',
        icon: 'question',
        dialog: 'Question'
      },
      component: LayOut,
      children: [{
        path: '/question/:type',
        name: '/question',
        component: Main,
        children: [{
          path: '',
          component: QuestionTable
        }]
      }]
    },
    {
      path: '/report',
      redirect: '/report/all',
      meta: {
        title: '有关报告',
        icon: 'navicon',
        dialog: 'report'
      },
      component: LayOut,
      children: [{
        path: '/report/:type',
        component: Main,
        children: [{
          path: '',
          component: ReportTable
        }]
      }]
    },
    {
      path: '/supervision',
      redirect: '/supervision/all',
      meta: {
        title: '日常监督信息',
        icon: 'mulu',
        dialog: 'Supervise'
      },
      component: LayOut,
      children: [{
        path: '/supervision/:type',
        component: Main,
        children: [{
          path: '',
          component: SuperviseTable
        }]
      }]
    },
    {
      path: '/incorrupt',
      redirect: '/incorrupt/all',
      meta: {
        title: '廉情报告',
        icon: 'authenticated'
      },
      component: LayOut,
      children: [{
        path: 'all',
        component: Main,
        children: [{
          path: '',
          component: IncorruptTable
        }]
      }]
    },
    {
      path: '/statistics',
      meta: {
        title: '统计分析',
        icon: 'statistics'
      },
      component: LayOut,
      children: [{
        path: '/',
        component: Main
      }]
    },
    {
      path: '/system',
      meta: {
        title: '系统管理',
        icon: 'setting'
      },
      component: LayOut,
      children: [{
        path: '/',
        component: Main
      }]
    }
  ]
})


export default router
