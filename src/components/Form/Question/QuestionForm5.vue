<template>
  <el-form :model="questionForm" size="mini" label-width="110px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="来源">
          <template v-if="status === 'create'">
          <el-select  v-model="questionForm.letter_source">
            <el-option v-for="letter in letterSelect" :key="letter.label" :label="letter.label" :value="letter.label"></el-option>
          </el-select>
          </template>
          <template v-else-if="status === 'detail'">
            <el-input :readonly="readonlyStatus" v-model="questionForm.letter_source"></el-input>
          </template>
        </el-form-item>
      </el-col>
      
      <el-col :span="11" :offset="1">
        <el-form-item label="收件日期">
          <el-date-picker v-model="questionForm.letter_time" placeholder="请选择收件日期" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="反映内容摘要">
          <el-input :readonly="readonlyStatus" type="textarea" :autosize="{ minRows: 3 }" v-model="questionForm.investigation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="信访件编号">
          <el-input :readonly="readonlyStatus" v-model="questionForm.letter_number"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="举报人">
          <el-input :readonly="readonlyStatus" v-model="questionForm.informant"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="举报人电话">
          <el-input :readonly="readonlyStatus" v-model="questionForm.cell_phone"></el-input>
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
        <el-form-item label="被举报人单位">

          <template v-if="status === 'create'">
            <span>{{questionForm.person_id | showInfo(userList, 'unitname')}}</span>
          </template>
          <template v-else>
            <span>{{questionForm.unit_name}}</span>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="被举报人职务">
          <template v-if="status === 'create'">
            <span>{{questionForm.person_id | showInfo(userList, 'position')}}</span>
          </template>
          <template v-else>
            <span>{{questionForm.position}}</span>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="违纪或涉法类型">
          <el-input :readonly="readonlyStatus" v-model="questionForm.discipline_type"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="信件处置结果">
          <el-select v-model="questionForm.result" placeholder="" :disabled="readonlyStatus">
            <el-option v-for="re in result" :key="re.label" :label="re.label" :value="re.label"></el-option>
          </el-select>
          <!-- <el-input :readonly="readonlyStatus" type="textarea" autosize v-model="questionForm.result"></el-input> -->
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
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" ref="upload" :on-error="errorUpload" :on-success="successUpload" :on-remove="removeFile">
            <el-col :span="15">
              <el-input v-model="fileUpload" readonly ></el-input>
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
  name: 'QuestionForm5',
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
          letter_number: '',
          letter_time: '',
          letter_source: '',
          investigation: '',
          result: '',
          remark: ''
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
  data() {
    return {
      fileUpload: '',
      archive_id: 5,
      letterSelect: [
        {
          label: '本机关受理'
        },
        {
          label: '机关领导转办'
        },
        {
          label: '机关领导交办'
        },
        {
          label: '上级转办'
        },
        {
          label: '上级交办'
        },
        {
          label: '其他部门交办'
        },
        {
          label: '其他部门转办'
        },
        {
          label: '本级派驻机构收信'
        },
        {
          label: '乡镇纪委纪工委收信'
        }
      ],
      result:[{
        label: '属实'
      },{
        label: '部分属实'
      },{
        label: '不属实'
      }],
      userList: [],
      loading: false
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
