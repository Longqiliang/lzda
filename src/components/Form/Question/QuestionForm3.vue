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
    <el-row>
      <el-col :span="11">
        <el-form-item label="工作单位">
          <template v-if="status === 'create'">
            <span>{{questionForm.person_id | showInfo(userList, 'unitname')}}</span>
          </template>
          <template v-else>
            <span>{{questionForm.unit_name}}</span>
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
        <el-form-item label="线索来源">
          <el-input :readonly="readonlyStatus" v-model="questionForm.rules_source"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="收件时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.accept_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="内容摘要">
          <el-input :readonly="readonlyStatus" v-model="questionForm.problem_summary"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="调查情况（基本事实摘要）">
          <el-input :readonly="readonlyStatus" type="textarea" :autosize="{ minRows: 2 }" v-model="questionForm.investigation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="承办部门">
          <el-input :readonly="readonlyStatus" v-model="questionForm.organizer"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="办结时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.completion_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="查处情况">
          <el-select :disable="readonlyStatus" v-model="questionForm.true_degree">
            <el-option v-for="degree in true_degree" :key="degree.label" :label="degree.label" :value="degree.label"></el-option>
          </el-select>
          <!-- <el-input :readonly="readonlyStatus" v-model="questionForm.true_degree"></el-input> -->
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="线索类型/违纪类型" label-width="140px">
          <el-input :readonly="readonlyStatus" v-model="questionForm.problem_type"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="是否立案">
          <el-radio-group v-model="questionForm.flag">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="立案时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.filing_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="四种形态类型">
          <el-input :readonly="readonlyStatus" v-model="questionForm.shape_type"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="处置方式">
          <el-select v-model="questionForm.disposing_type" placeholder="" :disabled="readonlyStatus">
            <el-option v-for="dt in disposing_type" :key="dt.label" :label="dt.label" :value="dt.label"></el-option>
          </el-select>
          <!-- <el-input :readonly="readonlyStatus" v-model="questionForm.shape_type"></el-input> -->
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="办理情况">
          <el-input :readonly="readonlyStatus" v-model="questionForm.handle_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item label="处理机关">
          <el-input :readonly="readonlyStatus" v-model="questionForm.handle_agency"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="处分文号">
          <el-input :readonly="readonlyStatus" v-model="questionForm.publish_number"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="处分起始时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.publish_starttime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="处分终止时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.publish_endtime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
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
import {
  uploadFile,
  addRecord,
  updateRecord,
  queryTermPerson
} from '@/api/article'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'QuestionForm3',
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
          completion_time: '',
          problem_summary: '',
          record_number: '',
          filing_time: '',
          file_type: '',
          rank: '',
          id: '',
          exposure_situation: '',
          publish_starttime: '',
          person_id: '',
          fileid: '',
          create_user_id: '',
          ethnic: '',
          create_time: '',
          rules_source: '',
          exposure_type: '',
          publish_endtime: '',
          cell_phone: '',
          unit_name: '',
          rules_source_people: '',
          file_id: '',
          name: '',
          shape_type: '',
          problem_type: '',
          position: '',
          work_time: '',
          flag: '',
          origin: '',
          id_card: '',
          handle_situation: '',
          remark: '',
          exposure_scope: '',
          update_time: '',
          political_status: '',
          personid: '',
          true_degree: '',
          unit_id: '',
          accept_time: '',
          archive_type_name: '',
          join_work_time: '',
          address: '',
          file_name: '',
          sex: '',
          dept_name: '',
          contact_number: '',
          file_size: '',
          archive_name: '',
          organizer: '',
          investigation: '',
          handle_agency: '',
          dept_id: '',
          archive_id: '',
          rules_source_unit: '',
          publish_number: ''
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
  data() {
    return {
      fileUpload: '',
      archive_id: 1,
      true_degree: [
        {
          label: '属实'
        },
        {
          label: '基本属实'
        },
        {
          label: '部分属实'
        },
        {
          label: '不属实'
        }
      ],
      disposing_type: [
        {
          label: '谈话函询'
        },
        {
          label: '初步核实'
        },
        {
          label: '疑存待查'
        },
        {
          label: '予以了结'
        }
      ],
      userList: [],
      loading: false
    }
  },
  methods: {
    ...mapMutations({
      closeDialog: 'question/toggleDialog',
      closeDetail: 'question/closeDetail',
      getList: 'question/refreshList'
    }),
    remoteMethod(query) {
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
      console.log(query)
      return
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
