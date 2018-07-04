<template>
  <el-dialog width="500px" :visible.sync="dialogVisible" class="setting-dialog" :before-close="toggleDialog">
    <div slot="title">
      组织机构信息管理
    </div>
    <template v-if="formVal">
      <el-form ref="settingUnitForm" :rules="rules" :model="formVal" label-width="100px" size="small">
        <el-form-item label="机构全称：" prop="unit_name">
          <el-input v-model="formVal.unit_name"></el-input>
        </el-form-item>
        <el-form-item label="机构简称：" prop="unit_abbreviation">
          <el-input v-model="formVal.unit_abbreviation"></el-input>
        </el-form-item>
        <el-form-item label="机构编码：" prop="unit_number">
          <el-input v-model="formVal.unit_number"></el-input>
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
import { addUnit, updateUnit } from '@/api/article'
export default {
  props: {
    formVal: {
      type: Object,
      default() {
        return {
          unit_name: '',
          unit_abbreviation: '',
          unit_number: ''
        }
      }
    }
  },
  data() {
    return {
      rules: {
        unit_name: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入单位名称'
          }
        ],
        unit_abbreviation: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入单位简称'
          }
        ],
        unit_number: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入单位编码'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.setting.unitDialog.show,
      status: state => state.setting.unitDialog.status
    })
  },
  methods: {
    ...mapMutations({
      toggleDialog: 'setting/toggleUnitDialog',
      changeState: 'setting/unitDialogSuccess'
    }),
    ...mapActions({
      getOrganize: 'GetOrganize'
    }),
    createData() {
      this.submitForm('settingUnitForm', this.createUnit)
    },
    updateData() {
      this.submitForm('settingUnitForm', this.changeUnit)
    },
    notify(type) {},
    createUnit() {
      addUnit(this.formVal).then(res => {
        const data = res.data
        if (data.success) {
          this.callBack('create')
        }
      })
    },
    changeUnit() {
      updateUnit(this.formVal).then(res => {
        const data = res.data
        if (data.success) {
          this.callBack('update')
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
          return false
        }
      })
    }
  }
}
</script>

<style>

</style>
