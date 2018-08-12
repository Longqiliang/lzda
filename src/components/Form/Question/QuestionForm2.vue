<template>
  <el-form :model="questionForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="问责对象">
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
        <el-form-item label="身份证号码">
          <template v-if="status === 'create'">
            <span class="txt-number">{{questionForm.person_id | showInfo(userList, 'idcard')}}</span>
          </template>
          <template v-else>
            <span>{{questionForm.id_card}}</span>
          </template>

        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24">
        <span class="form-label">问责对象工作岗位</span>
        <template v-if="status === 'create'">
            <span class="form-content">{{questionForm.person_id | showInfo(userList, 'unitname')}}{{questionForm.person_id | showInfo(userList, 'position')}}</span>
          </template>
          <template v-else>
            <span class="form-content">{{questionForm.unit_name}}{{questionForm.position}}</span>
          </template>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="问责情形">
          <el-cascader :disabled="readonlyStatus" :options="accountType" :show-all-levels="false" v-model="accountSelect" @change="handleChange"></el-cascader>
          <!-- <el-input :readonly="readonlyStatus" v-model="questionForm.account_type"></el-input> -->

        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="事由">
          <el-input :readonly="readonlyStatus" v-model="questionForm.account_cause"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="处理机关">
          <el-input :readonly="readonlyStatus" v-model="questionForm.account_agency"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="印发时间">
          <el-date-picker type="date" placeholder="选择日期" :readonly="readonlyStatus" v-model="questionForm.handle_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="文号">
          <el-input :readonly="readonlyStatus" v-model="questionForm.title"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="问题内容">
          <el-input :readonly="readonlyStatus" type="textarea" autosize v-model="questionForm.problem_context"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="备注">
          <el-input :readonly="readonlyStatus" type="textarea" :autosize="{ minRows: 3 }" v-model="questionForm.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="附件">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" ref="upload" :on-error="errorUpload" :on-success="successUpload" :on-remove="removeFile">
            <el-col :span="15">
              <el-input v-model="fileUpload" readonly></el-input>
            </el-col>
            <el-col :span="9">
              <el-button>上传附件</el-button>
            </el-col>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

</template>

<script>
import { uploadFile, addRecord, updateRecord, queryTermPerson } from '@/api/article'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'QuestionForm2',
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
          account_type: '',
          account_cause: '',
          account_agency: '',
          handle_time: '',
          title: '',
          problem_context: '',
          create_time: '',
          update_time: '',
          upload_user_id: ''
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
  created() {
    if (this.status != 'create') {
      this.filterAccount()
    }
  },
  data() {
    return {
      fileUpload: '',
      archive_id: 4,
      accountType: [
        {
          label: '行政问责',
          value: '行政问责',
          children: [
            { label: '训诫', value: '训诫' },
            { label: '责令作出书面检查', value: '责令作出书面检查' },
            { label: '通报批评', value: '通报批评' },
            { label: '调离现工作岗位', value: '调离现工作岗位' },
            { label: '责令辞去领导职务', value: '责令辞去领导职务' },
            { label: '免去领导职务', value: '免去领导职务' },
            { label: '处分', value: '处分' },
            { label: '书面告诫', value: '书面告诫' },
            { label: '责令作出书面检查', value: '责令作出书面检查' },
            { label: '责令公开道歉', value: '责令公开道歉' }
          ]
        },
        {
          label: '党内问责',
          value: '党内问责',
          children: [
            { label: '通报', value: '通报' },
            { label: '诫勉', value: '诫勉' },
            { label: '组织调整或者组织处理', value: '组织调整或者组织处理' },
            { label: '纪律处分', value: '纪律处分' }
          ]
        }
      ],
      accountSelect: [],
      userList: [],
      loading: false
    }
  },
  methods: {
    ...mapMutations({
      closeDialog: 'question/toggleDialog',
      closeDetail: 'question/closeDetail',getList: 'question/refreshList'
    }),
    filterAccount() {
      if (!this.questionForm.account_type) {
        this.accountSelect = []
        return
      }
      const accountObj = this.accountType.find(item =>
        item.children.find(
          children => children.value === this.questionForm.account_type
        )
      )
      if(!accountObj){
        this.accountSelect = []
        return
      }
      const accountChildren = accountObj.children.find(
        children => children.value === this.questionForm.account_type
      )
      const arr = []
      arr.push(accountObj.value)
      arr.push(accountChildren.value)
      this.accountSelect = arr
    },
    handleChange(array) {
      this.questionForm.account_type = array[1]
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
      console.log(query)
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
