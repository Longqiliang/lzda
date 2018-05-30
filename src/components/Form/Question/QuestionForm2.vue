<template>
  <el-form :model="questionForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="姓名">
          <template v-if="status === 'create'">
            <el-select v-model="questionForm.person_id" filterable >
              <el-option v-for="item in user" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
            <span class="txt-number">{{questionForm.person_id | showInfo(user, 'idcard')}}</span>
          </template>
          <template v-else>
            <span>{{questionForm.idcard}}</span>
          </template>

        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="工作单位">
          <template v-if="status === 'create'">
            <span>{{questionForm.person_id | showInfo(user, 'unitname')}}</span>
          </template>
          <template v-else>
            <span>{{questionForm.unitname}}</span>
          </template>

        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="职务">
          <template v-if="status === 'create'">
            <span>{{questionForm.person_id | showInfo(user, 'position')}}</span>
          </template>
          <template v-else>
            <span>{{questionForm.position}}</span>
          </template>

        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="问责类型">
          <el-cascader :options="accountType" :show-all-levels="false" v-model="questionForm.account_type"></el-cascader>
          <!-- <el-input v-model="questionForm.account_type"></el-input> -->
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="问责事由">
          <el-input v-model="questionForm.account_cause"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="处理机关">
          <el-input v-model="questionForm.account_agency"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="问责时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.handle_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="标题">
          <el-input v-model="questionForm.title"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="问题内容">
          <el-input type="textarea" autosize v-model="questionForm.problem_context"></el-input>
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
import { addRecord, updateRecord } from '@/api/article'
import { mapState, mapActions, mapMutations } from 'vuex'

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
  inject: ['getList'],
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
      ]
    }
  },
  methods: {
    ...mapMutations({
      closeDialog: 'question/toggleDialog',
      closeDetail: 'question/closeDetail'
    }),
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
            this.closeDialog()
            this.closeDetail()
          } else {
            this.$notify({
              title: '失败',
              message: '创建失败，请重试！',
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(err => {
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
