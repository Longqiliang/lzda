const namespaced = true

const state = {
  unitDialog: {
    show: false,
    status: 'create',
    formVal: {
      unit_name: '',
      unit_abbreviation: '',
      unit_number: ''
    },
    success: false
  },
  deptDialog: {
    show: false,
    status: 'create',
    formVal: null,
    success: false
  },
  userDialog: {
    show: false,
    status: 'create',
    formVal: null,
    success: false
  }
}

const mutations = {
  unitDialogSuccess() {
    state.unitDialog.success = true
  },
  unitDialogError() {
    state.unitDialog.success = false
  },
  deptDialogSuccess() {
    state.deptDialog.success = true
  },
  deptDialogError() {
    state.deptDialog.success = false
  },
  userDialogSuccess() {
    state.userDialog.success = true
  },
  userDialogError() {
    state.userDialog.success = false
  },
  toggleUnitDialog(state) {
    state.unitDialog.show = !state.unitDialog.show
  },
  toggleDeptDialog(state) {
    state.deptDialog.show = !state.deptDialog.show
  },
  toggleUserDialog(state) {
    state.userDialog.show = !state.userDialog.show
  },
  setUnitDialogStatus(state, status) {
    state.unitDialog.status = status
  },
  setDeptDialogStatus(state, status) {
    state.deptDialog.status = status
  },
  setUserDialogStatus(state, status) {
    state.userDialog.status = status
  },
  setUnitDialogFormVal(state, val) {
    state.unitDialog.formVal = val
  },
  initUnitDialogFormVal(state) {
    state.unitDialog.formVal = {
      unit_name: '',
      unit_abbreviation: '',
      unit_number: ''
    }
  },
  setDeptDialogFormVal(state, val) {
    state.deptDialog.formVal = val
  },
  setUserDialogFormVal(state, val) {
    state.userDialog.formVal = val
  },
  initDeptDialogFormVal(state) {

  },
  initUserDialogFormVal(state) {
    state.userDialog.formVal = {
      name: '',
      idcard: '',
      sex: '',
      position: '',
      rank: '',
      dept_id: '1',
      borntime: '',
      education: '',
      politicalstatus: '',
      ethnic: '',
      joinworktime: '',
      worktime: '',
      contactnumber: '',
      cellphone: '',
      origin: '',
      address: '',
      recordnumber: '',
      remark: '',
      unit_id: '',
      organizesOptions: []
    }
  }
}

export default {
  namespaced,
  state,
  mutations
}
