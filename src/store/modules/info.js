const namespaced = true

const state = {
  dialogShow: false,
  formVal: null,
  status: 'create',
}

const mutations = {
  toggleDialog(state) {
    state.dialogShow = !state.dialogShow
  },
  setFormVal(state, val) {
    state.formVal = val
  },
  setStatus(state, status) {
    state.status = status
  }
} 

export default {
  namespaced,
  state,
  mutations
}