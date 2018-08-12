<template>
  <el-form :model="questionForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="姓名">
          <template v-if="status === 'create'">
            <el-select v-model="questionForm.person_id" filterable remote :remote-method="remoteMethod" :loading="loading">
              <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </template>
          <template v-else>
            <span>{{questionForm.name}}</span>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="来文单位">
          <el-input :readonly="readonlyStatus" v-model="questionForm.communication_dept"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="来文时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.receipt_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="来文标题">
          <el-input :readonly="readonlyStatus" type="textarea" autosize v-model="questionForm.communication_content"></el-input>
          <!-- <el-upload action="https://jsonplaceholder.typicode.com/posts/" ref="upload" :on-error="errorUpload" :on-success="successUpload" :on-remove="removeFile">
            <el-col :span="15">
              <el-input :readonly="readonlyStatus" v-model="fileUpload" readonly></el-input>
            </el-col>
            <el-col :span="9">
              <el-button>上传附件</el-button>
            </el-col>
          </el-upload> -->
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="审核事项">
          <el-select :disabled="readonlyStatus" v-model="questionForm.audit_type" placeholder="请选择">
            <el-option v-for="(ty,t) in audit_type" :key="t" :label="ty.label" :value="ty.label"></el-option>
          </el-select>
          <!-- <el-input :readonly="readonlyStatus" type="textarea" autosize v-model="questionForm.audit_type"></el-input> -->
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="影响提拔任用人数" label-width="130px">
          <el-input :readonly="readonlyStatus" v-model="questionForm.promotions"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="人数">
          <el-input :readonly="readonlyStatus" v-model="questionForm.peoplenub"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="回复日期">
          <el-date-picker type="date" placeholder="选择日期" :readonly="readonlyStatus" v-model="questionForm.replydate" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="回复意见">
          <el-input :readonly="readonlyStatus" type="textarea" autosize v-model="questionForm.opinion"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="上传附件">
          <div>
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" ref="upload" :on-error="errorUpload" :on-success="successUpload" :on-remove="removeFile">
              <span class="upload-tit">提醒：</span>
              <el-button>上传附件</el-button>
            </el-upload>
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" ref="upload" :on-error="errorUpload" :on-success="successUpload" :on-remove="removeFile">
              <span class="upload-tit">谈话笔录：</span>
              <el-button>上传附件</el-button>
            </el-upload>
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" ref="upload" :on-error="errorUpload" :on-success="successUpload" :on-remove="removeFile">
              <span class="upload-tit">通知书：</span>
              <el-button>上传附件</el-button>
            </el-upload>
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" ref="upload" :on-error="errorUpload" :on-success="successUpload" :on-remove="removeFile">
              <span class="upload-tit">谈话问题目录：</span>
              <el-button>上传附件</el-button>
            </el-upload>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

</template>

<script>
import { uploadFile, addRecord, updateRecord, queryTermPerson } from '@/api/article'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'QuestionForm4',
  props: {
    user: {
      type: Array
    },
    status: {
      type: String,
      default: 'create'
    },
    questionForm: {
      type: Object,
      default() {
        return {
          communication_dept: '',
          receipt_time: '',
          communication_content: '',
          audit_type: '',
          opinion: ''
        }
      }
    }
  },
  filters: {
    showInfo(id, user, arg) {
      if (!id) {
        return
      }
      const item = user.find(item => {
        return item.id === id
      })
      return item[arg]
    }
  },
  computed: {
    ...mapState({
      type: state => state.question.questionForm,
      dialogShow: state => state.question.dialogShow
    }),
    readonlyStatus() {
      if (this.status === 'detail') {
        return true
      } else {
        return false
      }
    },
    uploadUrl() {
      if(this.questionForm.id) {
        this.uploadFile = `${uploadFile}?bussId=${this.questionForm.id}`
      }
      return this.uploadFile
    }
  },
  watch: {
    dialogShow(val) {
      if (!val) {
        if (this.$refs['questionForm']) {
          this.$refs['upload'].clearFiles()
          this.$refs['questionForm'].resetFields()
        }
      }
    }
  },
  data() {
    return {
      fileUpload: '',
      archive_id: 2,
      userList: [],
      loading: false,
      audit_type: [{
        label: '干部任职'
      },{
        label: '表彰奖励'
      },{
        label: '考核'
      },{
        label: '试用期转正'
      },{
        label: '辞职'
      },{
        label: '退休'
      },{
        label: '其它'
      }]
    }
  },
  methods: {
    ...mapMutations({
      closeDialog: 'question/toggleDialog',
      closeDetail: 'question/closeDetail',getList: 'question/refreshList'
    }),
    remoteMethod(query) {
      if (query !== ''  ) {
        this.loading = true
        queryTermPerson({
          pageIndex: 1,
          name: query
        }).then(res => {
          this.loading = false
          const data = res.data
          if(data.success) {
            this.userList = data.data
          }
        })
      } else {
        this.userList = []
      }
    },
    successUpload(response, file, fileList) {
      console.log(file)
      console.log(fileList)
      let fileArr = []
      for (file of fileList) {
        fileArr.push(file.name)
      }
      this.fileUpload = fileArr.join(',')
    },
    errorUpload(err, file, fileList) {
      console.log(err, file, fileList)
    },
    removeFile(file, fileList) {
      console.log(file, fileList)
    },
    createData() {
      let param = {
        archive_id: this.archive_id
      }
      let query = Object.assign(this.questionForm, param)
      addRecord(query)
        .then(res => {
          const data = res.data
          if (data.success) {
            this.getList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.$emit('closeLoad')
            this.closeDialog()
            this.closeDetail()
          } else {
            this.$emit('closeLoad')
            this.$notify({
              title: '失败',
              message: '创建失败，请重试！',
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(err => {
          this.$emit('closeLoad')
          this.$notify({
            title: '失败',
            message: '创建失败，请重试！',
            type: 'error',
            duration: 2000
          })
        })
    },
    updateData() {
      let param = {
        archive_id: this.archive_id
      }
      let query = Object.assign(this.questionForm, param)
      // console.log(query)
      // return
      updateRecord(query).then(res => {
        const data = res.data
        if (data.success) {
          this.getList()
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.closeDialog()
          this.closeDetail()
        } else {
          this.$notify({
            title: '失败',
            message: '修改失败，请重试',
            type: 'error',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
