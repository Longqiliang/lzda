<template>

  <el-dialog title="个人信息" :visible.sync="dialogVisible" width="600px" center :before-close="toggleDialog" class="setting-dialog">

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
            <el-input-number v-model="formVal.worktime" :min="1"></el-input-number> 年
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
        <el-button class="btn btn-primary" @click="createData">保 存</el-button>
        <el-button class="btn" @click="toggleDialog">取 消</el-button>
      </template>
      <template v-if="status === 'update'">
        <el-button class="btn btn-primary" @click="updateData">保 存</el-button>
        <el-button class="btn" @click="toggleDialog">取 消</el-button>
      </template>
      <template v-else-if="status === 'detail'">
        <!-- <el-button type="primary" @click="toggleDialog">预 览</el-button>
        <el-button @click="toggleDialog">导 出</el-button>
        <el-button @click="toggleDialog">关 闭</el-button> -->
      </template>
    </div>
  </el-dialog>
</template>

<script>
import { API, addPerson, updatePerson } from '@/api/article'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  props: {
    formVal: {
      type: Object,
      default() {
        return {}
      }
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
      },
      imageUrl: '',
      action: API + '/person/imageUpload'
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
    ...mapState({
      dialogVisible: state => state.setting.userDialog.show,
      status: state => state.setting.userDialog.status
    }),
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
    ...mapMutations({
      toggleDialog: 'setting/toggleUserDialog',
      changeState: 'setting/userDialogSuccess'
    }),
    handleChange(value) {
      this.formVal.unit_id = value[0]
      this.formVal.dept_id = value[1]
    },
    clearValidate() {
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.submitForm('dataForm', this.createUserInfo)
    },
    updateData() {
      this.submitForm('dataForm', this.updateUserInfo)
    },
    createUserInfo() {
      addPerson(this.formVal).then(res => {
        const data = res.data
        if (data.success) {
          this.callBack('create')
        } else {
          this.$notify({
            title: '失败',
            message: '创建失败，请重试！',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    updateUserInfo() {
      updatePerson(this.formVal).then(res => {
        const data = res.data
        if (data.success) {
          this.callBack('update')
        } else {
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

