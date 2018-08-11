<template>
  <el-dialog title="个人信息" :visible.sync="DialogVisible" width="800px" center :before-close="closeDialog" v-el-drag-dialog>
    <el-form :model="formVal" size="mini" label-width="100px" label-position="left" class="demo-form-inline" :rules="rules" ref="dataForm">
      <el-row>
        <el-col :span="11">
          <el-form-item label="姓名" prop="name">
            <el-input :readonly="formStatus" v-model="formVal.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="身份证号码" prop="idcard">
            <el-input :readonly="formStatus" v-model="formVal.idcard" :maxlength="18" @blur="getBronTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-form-item label="工作单位" prop="organizesOptions">
            <el-cascader :disabled="formStatus" placeholder="请选择工作单位" :options="organizes" :props="organizesProps" @change="handleChange" filterable v-model="formVal.organizesOptions" style="width: 100%;"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="formVal.sex" placeholder="请选择性别" style="width: 100%;" :disabled="formStatus">
              <el-option v-for="se in sex" :key="se.value" :label="se.label" :value="se.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="现任职务" prop="position">
            <el-input :readonly="formStatus" v-model="formVal.position"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="职级" prop="rank">
            <el-input :readonly="formStatus" v-model="formVal.rank"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="政治面貌" prop="politicalstatus">
            <el-input :readonly="formStatus" v-model="formVal.politicalstatus"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="学历" prop="education">
            <el-input :readonly="formStatus" v-model="formVal.education"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="出生日期" prop="borntime">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formVal.borntime" style="width: 100%;" readonly></el-date-picker>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="民族" prop="ethnic">
            <el-input :readonly="formStatus" v-model="formVal.ethnic"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="籍贯" prop="origin">
            <el-input :readonly="formStatus" v-model="formVal.origin"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="身份类别" prop="id_category">
            <el-select v-model="formVal.id_category" style="width: 100%;" :disabled="formStatus">
              <el-option v-for="(it,i) in identityType" :key="i" :label="it.label" :value="it.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="任现职时间" prop="worktime">
            <!-- <el-input-number v-model="formVal.worktime" :min="1"></el-input-number> 年 -->
            <el-date-picker type="date" placeholder="选择日期" v-model="formVal.worktime" style="width: 100%;" :readonly="formStatus"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="办公电话" prop="contactnumber">
            <el-input :readonly="formStatus" v-model="formVal.contactnumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input :readonly="formStatus" v-model="formVal.cellphone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-row>
        <el-col :span="23">
          <el-form-item label="住址" prop="address">
            <el-input :readonly="formStatus" v-model="formVal.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="23">
          <el-form-item label="档案编号" prop="recordnumber">
            <el-input :readonly="formStatus" v-model="formVal.recordnumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-form-item label="备注">
            <el-input :readonly="formStatus" type="textarea" :autosize="{ minRows: 4}" v-model="formVal.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="23">
          <el-form-item label="头像上传">
            <el-upload :action="action" ref="upload" :show-file-list="false" :on-error="errorUpload" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <template v-if="status === 'create'">
        <el-button type="primary" @click="createData" :loading="submitLoading">保 存</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </template>
      <template v-if="status === 'update'">
        <el-button type="primary" @click="updateData">保 存</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </template>
      <template v-else-if="status === 'detail'">
        <!-- <el-button type="primary" @click="closeDialog">预 览</el-button>
        <el-button @click="closeDialog">导 出</el-button>
        <el-button @click="closeDialog">关 闭</el-button> -->
      </template>
    </div>
  </el-dialog>
</template>

<script>
import { imageUpload, addPerson, updatePerson } from '@/api/article'
import { mapGetters } from 'vuex'
import elDragDialog from '@/directive/el-dragDialog'

export default {
  name: 'UserInfoDialog',
  directives: {
    elDragDialog
  },
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
    const validateIdCard = (rule, value, callback) => {
      if (value.length === 15 || value.length === 18) {
        callback()
      } else {
        callback(new Error('请输入有效的密码'))
      }
    }
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
      identityType: [
        {
          label: '公务员',
          value: '1'
        },
        {
          label: '职员',
          value: '2'
        },
        {
          label: '雇员',
          value: '3'
        },
        {
          label: '聘用人员',
          value: '4'
        },
        {
          label: '公共辅助员',
          value: '5'
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idcard: [
          {
            required: true,
            trigger: 'blur',
            validator: validateIdCard
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        id_category: [
          {
            required: true,
            message: '请选择身份类别',
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
        politicalstatus: [
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
        worktime: [
          {
            required: true,
            message: '请输入任现职时间',
            trigger: 'blur'
          }
        ],
        contactnumber: [
          {
            required: true,
            message: '请输入办公电话',
            trigger: 'blur'
          }
        ],
        cellphone: [
          {
            required: true,
            message: '请输入手机号码',
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
      },
      imageUrl: '',
      action: imageUpload,
      submitLoading: false
    }
  },
  watch: {
    status() {
      if (this.$refs['dataForm']) {
        this.$refs['dataForm'].clearValidate()
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
    getBronTime() {
      let idCard = this.formVal.idcard,
       birthday = ''
      if (idCard != null && idCard != '') {
        if (idCard.length == 15) {
          birthday = '19' + idCard.substr(6, 6)
        } else if (idCard.length == 18) {
          birthday = idCard.substr(6, 8)
        }
        birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
      }
      this.formVal.borntime = birthday
    },
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
          this.submitLoading = true
          addPerson(this.formVal)
            .then(res => {
              this.submitLoading = false
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
            .catch(() => {
              this.submitLoading = false
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
    handleAvatarSuccess(res, file) {},
    beforeAvatarUpload(file) {
      const isImage = file.type.startsWith('image/')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImage) {
        this.$message.error('请上传图片!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isImage && isLt2M
    },
    errorUpload(err, file, fileList) {
      console.log(err, file, fileList)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

