const namespaced = true

const state = {
  dialogShow: false,
  formVal: null
}

const mutations = {
  toggleDialog(state) {
    state.dialogShow = !state.dialogShow
  },
  setFormVal(state, val) {
    state.formVal = val
  }
} 

export default {
  namespaced,
  state,
  mutations
}