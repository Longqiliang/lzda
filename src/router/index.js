import Vue from 'vue'
import Router from 'vue-router'
import LayOut from '@/components/layout/LayOut'
import Main from '@/components/Main/Main'
import QuestionTable from '@/components/Table/QuestionTable'
import UserInfoMain from '@/components/Table/UserInfoMain'
import SuperviseTable from '@/components/Table/SuperviseTable'
import ReportTable from '@/components/Table/ReportTable'
import IncorruptTable from '@/components/Table/IncorruptTable'
import chart from '@/components/charts'
import person from '@/components/person'
import personDetail from '@/components/person/detail'
import setting from '@/components/Setting/Setting'
Vue.use(Router)

function propsFn(route) {
  return {
    unitId: route.query.unitId,
    deptId: route.query.deptId,
    name: route.query.name
  }
}

function portrayalPropsFn(route) {
  return {
    id: route.params.id,
    name: route.query.name,
    sex: route.query.sex,
    rank: route.query.rank,
    politicalstatus: route.query.politicalstatus,
    unitname: route.query.unitname,
    age: route.query.age,
    education: route.query.education,
    origin: route.query.origin,
    idcard: route.query.idcard
  }
}
const router = new Router({
  routes: [{
    path: '',
    redirect: '/index',
    hidden: true
  },{
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/components/login') 
  },
    {
      path: '/index',
      meta: {
        title: '首页',
        icon: 'index'
      },
      component: LayOut,
      children: [{
        path: '',
        component: chart
      }]
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
          component: UserInfoMain,
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
        component: Main,
        children: [{
          path: '',
          component: person,
          props: propsFn
        }, {
          path: 'detail/:id',
          component: personDetail,
          props: portrayalPropsFn
        }]
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
        component: Main,
        props: propsFn,
        children: [{
          path: '',
          component: QuestionTable,
          props: propsFn
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
        props: propsFn,
        children: [{
          path: '',
          component: ReportTable,
          props: propsFn
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
        props: propsFn,
        children: [{
          path: '',
          component: SuperviseTable,
          props: propsFn
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
        props: propsFn,
        children: [{
          path: '',
          component: IncorruptTable,
          props: propsFn
        }]
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
        component: setting
      }]
    }
  ]
})


export default router
