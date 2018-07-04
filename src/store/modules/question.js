const namespaced = true

const state = {
  dialogShow: false,
  detailShow: false,
  status: 'create',
  questionForm: 3,
  formVal: {},
  tableVal: null,
  success: false
}

const mutations = {
  initDialog(state) {
    state.formVal = {},
    state.questionForm = 3
  },
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
  setQuestionForm(state, val) {
    state.questionForm = val
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
