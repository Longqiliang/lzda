const namespaced = true

const state = {
  detailShow: false
}

const mutations = {
  toggleDetail(state) {
    state.detailShow = !state.detailShow
  },
  closeDetail(state) {
    state.detailShow = false
  }
} 

export default {
  namespaced,
  state,
  mutations
}