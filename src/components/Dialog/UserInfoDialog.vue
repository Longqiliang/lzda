<template>
  <el-dialog title="个人信息" :visible.sync="DialogVisible" width="40%" center :before-close="closeDialog">
    <el-form :model="formVal" size="mini" label-width="100px" label-position="left" class="demo-form-inline" :rules="rules" :disabled="formStatus" ref="dataForm">
      <el-row>
        <el-col :span="11">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formVal.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="身份证号码" prop="idcard">
            <el-input v-model="formVal.idcard"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="工作单位" prop="organizesOptions">
            <el-cascader placeholder="请选择工作单位" :options="organizes" :props="organizesProps" @change="handleChange" filterable v-model="formVal.organizesOptions"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="formVal.sex" placeholder="请选择性别">
              <el-option v-for="se in sex" :key="se.value" :label="se.label" :value="se.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="职务" prop="position">
            <el-input v-model="formVal.position"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="职级" prop="rank">
            <el-input v-model="formVal.rank"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="出生日期" prop="borntime">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formVal.borntime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="学历" prop="education">
            <el-input v-model="formVal.education"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="政治面貌" prop="politicalstatus">
            <el-input v-model="formVal.politicalstatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="民族" prop="ethnic">
            <el-input v-model="formVal.ethnic"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="参加工作时间" prop="joinworktime">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formVal.joinworktime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="任现职时间" prop="worktime">
            <el-input-number v-model="formVal.worktime"></el-input-number> 年
            <!-- <el-date-picker type="date" placeholder="选择日期" v-model="formVal.worktime" style="width: 100%;"></el-date-picker> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="联系电话" prop="contactnumber">
            <el-input v-model="formVal.contactnumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="手机" prop="cellphone">
            <el-input v-model="formVal.cellphone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-form-item label="籍贯" prop="origin">
            <el-input v-model="formVal.origin"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-form-item label="住址" prop="address">
            <el-input v-model="formVal.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-form-item label="档案编号" prop="recordnumber">
            <el-input v-model="formVal.recordnumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-form-item label="备注">
            <el-input type="textarea" autosize v-model="formVal.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-form-item label="附件">
            <el-upload action="/" ref="upload" :on-error="errorUpload">
              <el-button>上传附件</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <template v-if="status === 'create'">
        <el-button type="primary" @click="createData">保 存</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </template>
      <template v-if="status === 'update'">
        <el-button type="primary" @click="updateData">保 存</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </template>
      <template v-else-if="status === 'detail'">
        <el-button type="primary" @click="closeDialog">预 览</el-button>
        <el-button @click="closeDialog">导 出</el-button>
        <el-button @click="closeDialog">关 闭</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import { addPerson, updatePerson } from '@/api/article'
import { mapGetters } from 'vuex'

export default {
  name: 'UserInfoDialog',
  props: {
    formVal: {
      type: Object,
      default() {
        return {}
      }
    },
    status: {
      type: String,
      default: 'create'
    },
    DialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      organizesProps: {
        label: 'name',
        children: 'children',
        value: 'id'
      },
      sex: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idCard: [
          {
            required: true,
            message: '请输入身份证号码',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        position: [
          {
            required: true,
            message: '请输入职务',
            trigger: 'blur'
          }
        ],
        rank: [
          {
            required: true,
            message: '请输入职级',
            trigger: 'blur'
          }
        ],
        bornTime: [
          {
            required: true,
            message: '请选择出生年月',
            trigger: 'change'
          }
        ],
        education: [
          {
            required: true,
            message: '请输入学历',
            trigger: 'blur'
          }
        ],
        politicalStatus: [
          {
            required: true,
            message: '请输入政治面貌',
            trigger: 'blur'
          }
        ],
        ethnic: [
          {
            required: true,
            message: '请输入名族',
            trigger: 'blur'
          }
        ],
        joinWorkTime: [
          {
            required: true,
            message: '请选择参加工作时间',
            trigger: 'change'
          }
        ],
        workTime: [
          {
            required: true,
            message: '请输入任现职时间',
            trigger: 'blur'
          }
        ],
        contactNumber: [
          {
            required: true,
            message: '请输入联系电话',
            trigger: 'blur'
          }
        ],
        cellPhone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }
        ],
        origin: [
          {
            required: true,
            message: '请输入籍贯',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }
        ],
        recordNumber: [
          {
            required: true,
            message: '请输入档案编号',
            trigger: 'blur'
          }
        ],
        organizesOptions: [
          {
            required: true,
            message: '请选择工作单位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    status() {
      if (this.$refs['dataForm']) {
        this.clearValidate()
      }
    }
  },
  computed: {
    ...mapGetters({
      organizes: 'organizes'
    }),
    formStatus() {
      if (this.status === 'detail') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    handleChange(value) {
      this.formVal.unit_id = value[0]
      this.formVal.dept_id = value[1]
    },
    updateTable() {
      this.$emit('update-table')
    },
    clearValidate() {
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    closeDialog() {
      this.$emit('update:DialogVisible', false)
      this.clearValidate()
    },
    createData() {
      this.$refs['dataForm'].validate(v => {
        if (v) {
          addPerson(this.formVal).then(res => {
            const data = res.data
            if (data.success) {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.updateTable()
              this.closeDialog()
            } else {
              this.$notify({
                title: '失败',
                message: '创建失败，请重试！',
                type: 'error',
                duration: 2000
              })
            }
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(v => {
        if (v) {
          updatePerson(this.formVal).then(res => {
            const data = res.data
            if (data.success) {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.updateTable()
            } else {
              this.$notify({
                title: '失败',
                message: '修改失败，请重试',
                type: 'error',
                duration: 2000
              })
            }
            this.closeDialog()
          })
        }
      })
    },
    successUpload(response, file, fileList) {
      console.log(response, file, fileList)
    },
    errorUpload(err, file, fileList) {
      console.log(err, file, fileList)
    }
  }
}
</script>

<style>

</style>
