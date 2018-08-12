<template>
  <div>
    <el-form :model="questionForm" ref="questionForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
      <el-row>
        <el-col :span="11">
          <el-form-item label="谈话对象">
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
      <el-row>
        <el-col :span="11">
          <el-form-item label="职级">
            <template v-if="status === 'create'">
              <span>{{questionForm.person_id | showInfo(userList, 'rank')}}</span>
            </template>
            <template v-else>
              <span>{{questionForm.rank}}</span>
            </template>

          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="政治面貌">
            <template v-if="status === 'create'">
              <span>{{questionForm.person_id | showInfo(userList, 'politicalstatus')}}</span>
            </template>
            <template v-else>
              <span>{{questionForm.politicalstatus}}</span>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="谈话时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.talk_time" value-format="yyyy-MM-dd" style="width: 100%;" :readonly="readonlyStatus"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <template v-if="type && type == '21'">
            <el-form-item label="谈话方式">
              <el-input :readonly="readonlyStatus" v-model="questionForm.talk_type"></el-input>
            </el-form-item>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="谈话人">
            <el-input :readonly="readonlyStatus" v-model="questionForm.talk_user_id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="记录人">
            <el-input :readonly="readonlyStatus" v-model="questionForm.record_user_id"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-form-item label="谈话内容">
            <el-input :readonly="readonlyStatus" type="textarea" :autosize="{ minRows: 3 }" v-model="questionForm.talk_reason"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-form-item label="备注">
            <el-input :readonly="readonlyStatus" type="textarea" autosize v-model="questionForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-form-item label="附件">
            <el-upload :action="uploadUrl" ref="upload" :on-error="errorUpload" :on-success="successUpload" :disabled="readonlyStatus">
              <el-button>上传附件</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>

</template>

<script>
import {
  uploadFile,
  addRecord,
  updateRecord,
  queryTermPerson
} from '@/api/article'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'QuestionForm1',
  props: {
    user: {
      type: Array
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
          remark: '',
          talk_type: '',
          talk_reason: '',
          update_time: '',
          political_status: '',
          file_type: '',
          rank: '',
          personid: '',
          id: '',
          unit_id: '',
          person_id: '',
          fileid: '',
          archive_type_name: '',
          join_work_time: '',
          ethnic: '',
          address: '',
          create_time: '',
          file_name: '',
          sex: '',
          dept_name: '',
          record_user_id: '',
          contact_number: '',
          file_size: '',
          cell_phone: '',
          unit_name: '',
          upload_user_id: '',
          archive_name: '',
          file_id: '',
          name: '',
          position: '',
          work_time: '',
          talk_user_id: '',
          dept_id: '',
          talk_time: '',
          archive_id: ''
        }
      }
    },
    status: {
      type: String,
      default: 'create'
    }
  },
  filters: {
    showInfo(id, user, arg) {
      if (!id || user.length < 1) {
        return
      }
      const item = user.find(item => {
        return item.id === id
      })
      return item[arg]
    }
  },

  created() {},
  data() {
    return {
      userList: [],
      loading: false,
      uploadFile: uploadFile
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
      if (this.questionForm.id) {
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
  methods: {
    ...mapMutations({
      closeDialog: 'question/toggleDialog',
      closeDetail: 'question/closeDetail',
      getList: 'question/refreshList'
    }),
    remoteMethod(query) {
      if (query) {
        if (query !== '') {
          this.loading = true
          queryTermPerson({
            pageIndex: 1,
            name: query
          }).then(res => {
            this.loading = false
            const data = res.data
            if (data.success) {
              this.userList = data.data
            }
          })
        } else {
          this.userList = []
        }
      } else {
        this.loading = true
        queryTermPerson({
          pageIndex: 1,
          name: query
        }).then(res => {
          this.loading = false
          const data = res.data
          if (data.success) {
            this.userList = data.data
          }
        })
      }
    },
    successUpload(response, file, fileList) {
      console.log(this.questionForm.id)
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
    createData() {
      let param = {
        archive_id: this.type
      }
      let query = Object.assign(this.questionForm, param)
      // console.log(query)
      // return
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
        .catch(error => {
          this.$emit('closeLoad')
          if (error) {
            this.$notify({
              title: '失败',
              message: '创建失败，请重试！',
              type: 'error',
              duration: 2000
            })
          }
        })
    },
    updateData() {
      let param = {
        archive_id: this.type
      }
      let query = Object.assign(this.questionForm, param)
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
