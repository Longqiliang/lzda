<template>
  <el-form :model="questionForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="举报人姓名">
         <el-input :readonly="readonlyStatus" placeholder="请输入举报人姓名" v-model="questionForm.informant_name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="其它信息">
          <el-input :readonly="readonlyStatus" v-model="questionForm.information_other"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
         <el-form-item label="被举报人姓名">
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
      <el-col :span="11" :offset="1">
        <el-form-item label="职务">
          <template v-if="status === 'create'">
            <span>{{questionForm.person_id | showInfo(userList, 'position')}}</span>
          </template>
          <template v-else>
            <span>{{questionForm.position}}</span>
          </template>

        </el-form-item>
      </el-col>
    </el-row>

    <el-row v-show="questionForm.interviews_type">
      <el-col :span="11">
        <el-form-item :label="timeText">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.interviews_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item :label="numberText">
          <el-input :readonly="readonlyStatus" v-model="questionForm.interviews_number"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- <el-row>
      <el-col :span="23">
        <el-form-item label="事由">
          <el-input :readonly="readonlyStatus" v-model="questionForm.interviews_cause"></el-input>
        </el-form-item>
      </el-col>
    </el-row> -->
    <el-row>
      <el-col :span="23">
        <el-form-item label="内容">
          <el-input :readonly="readonlyStatus" type="textarea" :autosize="{ minRows: 3 }" v-model="questionForm.interviews_context"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="结果">
          <el-input :readonly="readonlyStatus" type="textarea" :autosize="{ minRows: 3 }" v-model="questionForm.interviews_result"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="上传附件">
          <div>
            <el-upload :action="uploadUrl" :file-list="filelistByType(2)" :data="{file_type_name: 2}" :on-success="successUpload" :disabled="readonlyStatus">
              <span class="upload-tit">提醒：</span>
              <el-button>上传附件</el-button>
            </el-upload>
            <el-upload :action="uploadUrl" :file-list="filelistByType(3)" :data="{file_type_name: 3}" :on-success="successUpload" :disabled="readonlyStatus">
              <span class="upload-tit">谈话笔录：</span>
              <el-button>上传附件</el-button>
            </el-upload>
            <el-upload :action="uploadUrl" :file-list="filelistByType(4)" :data="{file_type_name: 4}" :on-success="successUpload" :disabled="readonlyStatus">
              <span class="upload-tit">通知书：</span>
              <el-button>上传附件</el-button>
            </el-upload>
            <el-upload :action="uploadUrl" :file-list="filelistByType(5)"  :data="{file_type_name: 5}" ref="upload" :on-error="errorUpload" :on-success="successUpload" :disabled="readonlyStatus">
              <span class="upload-tit">谈话问题目录：</span>
              <el-button>上传附件</el-button>
            </el-upload>
          </div>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="23">
        <el-form-item label="附件">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" ref="upload" :on-error="errorUpload" :on-success="successUpload" :on-remove="removeFile">
            <el-col :span="10">
              <el-input v-model="fileUpload" readonly></el-input>
            </el-col>
            <el-col :span="14">
              <el-button>上传附件</el-button>
              <span>谈话笔录/函询扫描件</span>
            </el-col>
          </el-upload>
        </el-form-item>
      </el-col> -->
    </el-row>
  </el-form>

</template>

<script>
import { uploadFile, addRecord, updateRecord, queryTermPerson } from '@/api/article'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'QuestionForm6',
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
          born_time: '',
          education: '',
          origin: '',
          record_number: '',
          id_card: '',
          interviews_type: '',
          remark: '',
          update_time: '',
          political_status: '',
          interviews_time: '',
          interviews_result: '',
          file_type: '',
          rank: '',
          personid: '',
          id: '',
          unit_id: '',
          person_id: '',
          fileid: '',
          archive_type_name: '',
          join_work_time: '',
          create_user_id: '',
          ethnic: '',
          address: '',
          create_time: '',
          file_name: '',
          sex: '',
          interviews_context: '',
          dept_name: '',
          contact_number: '',
          file_size: '',
          cell_phone: '',
          unit_name: '',
          archive_name: '',
          file_id: '',
          name: '',
          position: '',
          work_time: '',
          interviews_cause: '',
          interviews_number: '',
          dept_id: '',
          archive_id: ''
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
      talkType: [
        {
          label: '谈话',
          value: '1'
        },
        {
          label: '函询',
          value: '2'
        }
      ],
      userList: [],
      loading: false,
      uploadFile: uploadFile,
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
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
    },
    numberText() {
      if (this.questionForm.interviews_type === '1') {
        return '谈话文号'
      } else if (this.questionForm.interviews_type === '2') {
        return '函询文号'
      }
    },
    timeText() {
      if (this.questionForm.interviews_type === '1') {
        return '谈话时间'
      } else if (this.questionForm.interviews_type === '2') {
        return '函询时间'
      }
    }
  },
  methods: {
    ...mapMutations({
      closeDialog: 'question/toggleDialog',
      closeDetail: 'question/closeDetail',getList: 'question/refreshList'
    }),
    filelistByType(type) {
      if(!this.questionForm.fileList){
        return
      }
      let list = this.questionForm.fileList.filter(v => {
        return parseInt(v.file_type_name) === type
      })
      for(let item of list){
        item.name = item.file_name
      }
      this[`fileList${type}`] = list
      return list
    },
    updatefileList(type) {

    },
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
      //console.log(this.questionForm.id)
      if (!this.questionForm.id) {
        if (response.bussId) {
          this.questionForm.bussId = response.bussId
          this.uploadFile = `${uploadFile}?bussId=${response.bussId}`
        }
      }
    },
    errorUpload(err, file, fileList) {
      console.log(err, file, fileList)
    },
    removeFile(file, fileList) {
      console.log(file, fileList)
    },
    handleChange(val) {
      this.$set(this.questionForm, 'interviews_number', '')
    },
    createData() {
      let param = {
        archive_id: this.type
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
