<template>
  <el-dialog width="500px" :visible.sync="dialogVisible" class="setting-dialog" :before-close="toggleDialog">
    <div slot="title">
      组织机构信息管理
    </div>
    <template v-if="formVal">
      <el-form ref="settingDeptForm" :rules="rules" :model="formVal" label-width="100px" size="small">
        <el-form-item label="上级机构：">
          <el-select v-model="formVal.unit_id" placeholder="请选择">
            <el-option v-for="item in data" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称：" prop="dept_name">
          <el-input v-model="formVal.dept_name"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <div slot="footer">
      <template v-if="status === 'create'">
        <el-button class="btn btn-primary" @click="createData">保存</el-button>
        <el-button class="btn" @click="toggleDialog">取消</el-button>
      </template>
      <template v-else-if="status === 'update'">
        <el-button class="btn btn-primary" @click="updateData">保存</el-button>
        <el-button class="btn" @click="toggleDialog">取消</el-button>
      </template>

    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { organizesAddDept, updateDept } from '@/api/article'

export default {
  props: {
    formVal: {
      type: Object,
      default() {
        return {
          dept_name: '',
          unit_id: ''
        }
      }
    }
  },
  data() {
    return {
      rules: {
        unit_id: [
          {
            required: true,
            trigger: 'change',
            message: '请选择单位'
          }
        ],
        dept_name: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入部门名称'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.setting.deptDialog.show,
      status: state => state.setting.deptDialog.status
    }),
    ...mapGetters({
      data: 'organizes'
    })
  },
  watch: {
    dialogVisible() {
      if (this.$refs['settingDeptForm']) {
        this.$refs['settingDeptForm'].clearValidate()
      }
    }
  },
  methods: {
    ...mapMutations({
      toggleDialog: 'setting/toggleDeptDialog',
      changeState: 'setting/deptDialogSuccess'
    }),
    ...mapActions({
      getOrganize: 'GetOrganize'
    }),
    createData() {
      this.submitForm('settingDeptForm', this.createDepartment)
    },
    updateData() {
      this.submitForm('settingDeptForm', this.changeDepartment)
    },
    createDepartment() {
      organizesAddDept(this.formVal).then(res => {
        const data = res.data
        if (data.success) {
          this.callBack('create')
        }
      })
    },
    changeDepartment() {
      updateDept(this.formVal).then(res => {
        const data = res.data
        if (data.success) {
          this.callBack('update')
        }else {
              this.$notify({
                title: '失败',
                message: '修改失败，请重试',
                type: 'error',
                duration: 2000
              })
            }
      })
    },
    callBack(type) {
      let txt
      switch (type) {
        case 'create':
          txt = '创建'
          break
        case 'update':
          txt = '修改'
          break
      }
      this.$notify({
        title: '成功',
        message: txt + '成功',
        type: 'success',
        duration: 2000
      })
      this.toggleDialog()
      this.changeState()
      this.getOrganize()
    },
    submitForm(formName, method) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          method()
        } else {
          // this.$notify({
          //   title: '失败',
          //   message: '失败请重试！',
          //   type: 'error',
          //   duration: 2000
          // })
          return false
        }
      })
    }
  }
}
</script>

<style>

</style>
