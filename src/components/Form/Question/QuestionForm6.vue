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
        <el-form-item label="谈话时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.interviews_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="类型">
          <el-select v-model="questionForm.interviews_type">
            <el-option v-for="ta in talkType" :key="ta.label" :label="ta.label" :value="ta.label"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="23">
        <el-form-item label="事由">
          <el-input v-model="questionForm.interviews_cause"></el-input>
        </el-form-item>
      </el-col>
    </el-row> -->
    <el-row>
      <el-col :span="23">
        <el-form-item label="内容">
          <el-input type="textarea" autosize v-model="questionForm.interviews_context"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="结果">
          <el-input type="textarea" autosize v-model="questionForm.interviews_result"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
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
      </el-col>
    </el-row>
  </el-form>

</template>

<script>
import { addRecord, updateRecord } from '@/api/article'
import { mapState, mapActions, mapMutations } from 'vuex'

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
          interviews_time: '',
          interviews_type: '',
          interviews_cause: '',
          interviews_context: '',
          interviews_result: '',
          create_time: '',
          update_time: ''
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
      talkType: [
        {
          label: '谈话'
        },
        {
          label: '函询'
        }
      ],
      archive_id: 6
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
