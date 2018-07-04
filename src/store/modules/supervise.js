const namespaced = true

const state = {
  dialogShow: false,
  detailShow: false,
  status: 'create',
  superviseForm: 15,
  formVal: {},
  tableVal: null,
  success: false
}

const mutations = {
  toggleDialog(state) {
    state.dialogShow = !state.dialogShow
  },
  toggleDetail(state) {
    state.detailShow = !state.detailShow
  },
  closeDetail(state) {
    state.detailShow = false
  },
  setStatus(state, status) {
    state.status = status
  },
  setSuperviseForm(state, type) {
    state.superviseForm = type
  },
  setFormVal(state, val) {
    state.formVal = val
  },
  setTableVal(state, val) {
    state.tableVal = val
  },
  refreshList() {
    state.success = true
  },
  errorList() {
    state.success = false
  }
}

const actions = {
  GetTableVal({commit}) {
    return new Promise()
  }
}

export default {
  namespaced,
  state,
  mutations
}
