const namespaced = true

const state = {
  dialogShow: false,
  detailShow: false,
  status: 'create',
  reportForm: 8,
  formVal: null,
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
  setReportForm(state, type) {
    state.reportForm = type
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
