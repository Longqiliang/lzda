import {
  queryOrganize,
  queryTermPerson
} from '@/api/article'

const APP = {
  state() {
    return {
      organize: [],
      info: []
    }
  },
  mutations: {
    SET_ORGANIZE(state, o) {
      state.organize = o
    },
    SET_INFO(state, info) {
      state.info = info
    }
  },
  getters: {
    organizes: (state, getters, rootState) => {
      return rootState.app.organize
    },
    info: (state, getters, rootState) => {
      return rootState.app.info
    },
    organizesAll: (state, getters, rootState) => {
      const system = [{
        name: '廉政档案',
        id: '001',
        children: rootState.app.organize
      }]
      return system
    },
    getOrganizeById: (state, getters, rootState) => (id) => {
      return rootState.organize.filter(item => item.id === id)
    },
    getInfoByName: (state) => (query) => {
      return state.info.filter(item => item.name.indexOf(query) > -1)
    },
    getInfoById: (state) => (id) => {
      return state.info.filter(item => item.id === id)
    }
  },
  actions: {
    GetOrganize({
      commit
    }) {
      return new Promise((resolve, reject) => {
        queryOrganize().then(res => {
          const data = res.data
          if (data.success) {
            commit('SET_ORGANIZE', data.data)
            resolve(res)
          } else {
            reject(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        const query = {
          pageIndex: 1,
          pageSize: null
        }
        queryTermPerson(query).then(res => {
          const data = res.data
          if (data.success) {
            commit('SET_INFO', data.data)
            resolve(res)
          } else {
            resolve('error')
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default APP
