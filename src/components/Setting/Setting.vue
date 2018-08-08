<template>
  <el-container direction="vertical" class="main-bg">
    <div class="container">
      <div class="header">
        <Breadcrumb />
      </div>
      <div class="container-main">
        <el-aside width="auto" class="aside" style="min-width:300px">
          <div class="tree-box">
            <div class="tree">
              <div class="tree-scroll">
                <el-tree :data="data" :props="defaultProps" :draggable="false" @node-click="handleNodeClick" :default-expanded-keys="['001']" node-key="id" accordion>
                </el-tree>
              </div>
            </div>
          </div>

        </el-aside>
        <el-main style="padding:0 10px 20px;">
          <el-button type="danger" icon="el-icon-plus" class="btn-danger" @click="changeStatus">{{statusObj.text}}</el-button>
          <component :is="currentComponent('Table')" :id="id"></component>
        </el-main>
      </div>
      <component :is="currentComponent('Dialog')" :formVal="currentFormVal"></component>
    </div>

  </el-container>
</template>

<script>
import {
  Breadcrumb,
  DeptSettingDialog,
  UnitSettingDialog,
  UserSettingDialog,
  UnitSettingTable,
  DeptSettingTable,
  UserSettingTable
} from './index'
import { createNamespacedHelpers, mapGetters } from 'vuex'

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  'setting'
)
export default {
  name: 'Setting',
  components: {
    Breadcrumb,
    DeptSettingDialog,
    UnitSettingDialog,
    UserSettingDialog,
    UnitSettingTable,
    DeptSettingTable,
    UserSettingTable
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      status: [
        {
          type: 1,
          text: '新增单位',
          name: 'UnitSetting'
        },
        {
          type: 2,
          text: '新增部门',
          name: 'DeptSetting'
        },
        {
          type: 3,
          text: '新增人员',
          name: 'UserSetting'
        }
      ],
      selectStatus: 1,
      id: null,
      deptFormVal: {
        unit_id: '',
        dept_name: ''
      }
    }
  },
  created() {
    const unitFormVal = {
      unit_name: '',
      unit_abbreviation: '',
      unit_number: ''
    }
    this.setUnitDialogFormVal(unitFormVal)
  },
  computed: {
    ...mapState({
      unitDialogFormVal: state => state.unitDialog.formVal,
      deptDialogFormVal: state => state.deptDialog.formVal,
      userDialogFormVal: state => state.userDialog.formVal,
      deptDialogSuccess: state => state.deptDialog.success
    }),
    ...mapGetters({
      data: 'organizesAll'
    }),
    statusObj() {
      return this.status.find(v => {
        return v.type === this.selectStatus
      })
    },
    currentFormVal() {
      switch (this.statusObj.type) {
        case 1:
          return this.unitDialogFormVal
          break
        case 2:
          return this.deptDialogFormVal
          break
        case 3:
          return this.userDialogFormVal
          break
      }
    }
  },
  methods: {
    ...mapMutations([
      'toggleUnitDialog',
      'toggleDeptDialog',
      'toggleUserDialog',
      'setUnitDialogFormVal',
      'setDeptDialogFormVal',
      'setUnitDialogStatus',
      'setDeptDialogStatus',
      'setUserDialogStatus',
      'initUnitDialogFormVal',
      'initUserDialogFormVal'
    ]),
    currentComponent(type) {
      return this.statusObj.name + type
    },
    changeStatus() {
      switch (this.selectStatus) {
        case 1:
          this.setUnitDialogStatus('create')
          this.initUnitDialogFormVal()
          this.toggleUnitDialog()
          break
        case 2:
          this.setDeptDialogStatus('create')
          this.setDeptDialogFormVal(this.deptFormVal)
          this.toggleDeptDialog()
          break
        case 3:
          this.setUserDialogStatus('create')
          this.initUserDialogFormVal()
          this.toggleUserDialog()
          break
      }
    },
    handleNodeClick(val, node) {
      console.log(val)
      if (node.parent.parent) {
        if (val.unit_id) {
          this.selectStatus = 3
          this.id = val.id
          this.initUserDialogFormVal()
        } else {
          this.selectStatus = 2
          this.id = val.id
          this.deptFormVal = {
            unit_id: val.id,
            dept_name: ''
          }
          this.setDeptDialogFormVal(this.deptFormVal)
        }
      } else {
        this.selectStatus = 1
        const unitFormVal = {
          unit_name: '',
          unit_abbreviation: '',
          unit_number: ''
        }
        this.setUnitDialogFormVal(unitFormVal)
      }
    }
  }
}
</script>

