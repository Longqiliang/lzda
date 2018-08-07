<template>
  <el-form :model="questionForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="姓名">
          <template v-if="status === 'create'">
            <el-select :disabled="readonlyStatus" v-model="questionForm.person_id" filterable remote :remote-method="remoteMethod" :loading="loading">
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
        <el-form-item label="违纪行为">
          <el-select :disabled="readonlyStatus" v-model="questionForm.disciplinary_action">
            <el-option v-for="dis in discipline" :key="dis.label" :label="dis.label" :value="dis.label"></el-option>
          </el-select>

        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="违法行为">
          <el-select :disabled="readonlyStatus" v-model="questionForm.illegal_action">
            <el-option v-for="ill in infringe" :key="ill.label" :label="ill.label" :value="ill.label"></el-option>
          </el-select>

        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="处分类型">
        <template v-if="type == '7'">
          <el-select :disabled="readonlyStatus" v-model="questionForm.disciplinary_type">
            <el-option v-for="dis in disposeType" :key="dis.label" :label="dis.label" :value="dis.label"></el-option>
          </el-select>
        </template>
        <template v-else-if="type == '22'">
          <el-select :disabled="readonlyStatus" v-model="questionForm.disciplinary_type">
            <el-option v-for="go in governmentType" :key="go.label" :label="go.label" :value="go.label"></el-option>
          </el-select>
        </template>
          
        </el-form-item>
      </el-col>
      <!-- <el-col :span="11" :offset="1">
        <el-form-item label="案件性质">
          <el-input :readonly="readonlyStatus" v-model="questionForm.cause_natrue"></el-input>
        </el-form-item>
      </el-col> -->
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="处分机关">
          <el-input :readonly="readonlyStatus" v-model="questionForm.agency"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="处分文号">
          <el-input :readonly="readonlyStatus" v-model="questionForm.disciplinary_number"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="处分起始时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.start_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="处分终止时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.end_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="违纪或违法事实">
          <el-input :readonly="readonlyStatus" v-model="questionForm.disciplinary_facts"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="处理情况">
          <el-input :readonly="readonlyStatus" type="textarea" autosize v-model="questionForm.situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="附件上传">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" ref="upload" :on-error="errorUpload" :on-success="successUpload" :on-remove="removeFile">
            <el-col :span="15">
              <el-input  v-model="fileUpload" readonly></el-input>
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
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'QuestionForm7',
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
          disciplinary_type: '',
          id_card: '',
          remark: '',
          update_time: '',
          political_status: '',
          file_type: '',
          rank: '',
          personid: '',
          id: '',
          disciplinary_number: '',
          illegal_action: '',
          unit_id: '',
          situation: '',
          person_id: '',
          fileid: '',
          archive_type_name: '',
          join_work_time: '',
          create_user_id: '',
          ethnic: '',
          address: '',
          agency: '',
          create_time: '',
          cause_natrue: '',
          file_name: '',
          sex: '',
          disciplinary_action: '',
          end_time: '',
          dept_name: '',
          contact_number: '',
          file_size: '',
          cell_phone: '',
          unit_name: '',
          start_time: '',
          disciplinary_facts: '',
          archive_name: '',
          file_id: '',
          name: '',
          position: '',
          work_time: '',
          dept_id: '',
          archive_id: ''
        }
      }
    }
  },
  data() {
    return {
      fileUpload: '',
      discipline: [
        {
          label: '违反政治纪律'
        },
        {
          label: '违反组织纪律'
        },
        {
          label: '违反廉洁纪律'
        },
        {
          label: '违反群众纪律'
        },
        {
          label: '违反工作纪律'
        },
        {
          label: '违反生活纪律'
        },
        {
          label: '无违纪行为'
        }
      ],
      infringe: [
        {
          label: '贪污受贿'
        },
        {
          label: '其他职务违法犯罪行为'
        },
        {
          label: '其他违法犯罪行为'
        },
        {
          label: '渎职侵权'
        },
        {
          label: '无违法行为'
        }
      ],
      disposeType: [
        { label: '党内警告处分' },
        { label: '党内严重警告处分' },
        { label: '撤销党内职务处分' },
        { label: '留档查看一年' },
        { label: '留档查看两年' },
        { label: '开除党籍处分' }
      ],
      governmentType: [
        { label: '警告' },
        { label: '记过' },
        { label: '记大过' },
        { label: '降级' },
        { label: '撤职' },
        { label: '开除' }
      ],
      userList: [],
      loading: false
    }
  },
  computed: {
    ...mapState({
      type: state => state.question.questionForm
    }),
    ...mapGetters({
      getInfoByName: state => state.app.getInfoByName
    }),
    readonlyStatus() {
      if(this.status === 'detail'){
        return true
      }else {
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
  methods: {
    ...mapMutations({
      closeDialog: 'question/toggleDialog',
      closeDetail: 'question/closeDetail',getList: 'question/refreshList'
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
            this.$notify({
              title: '失败',
              message: '创建失败，请重试！',
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(err => {
          if (err) {
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
