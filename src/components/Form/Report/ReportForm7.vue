<template>
  <el-form :model="reportForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="姓名">
          <template v-if="status === 'create'">
            <el-select v-model="reportForm.person_id" filterable remote :remote-method="remoteMethod" :loading="loading">
              <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </template>
          <template v-else>
            <span>{{reportForm.name}}</span>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="政治面貌">
           <template v-if="status === 'create'">
            <span>{{reportForm.person_id | showInfo(userList, 'politicalstatus')}}</span>
          </template>
          <template v-else>
            <span>{{reportForm.political_status}}</span>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="单位及职务">
          <template v-if="status === 'create'">
            <span>{{reportForm.person_id | showInfo(userList, 'unitname')}}{{reportForm.person_id | showInfo(userList, 'position')}}</span>
          </template>
          <template v-else>
            <span>{{reportForm.unit_name}}{{reportForm.position}}</span>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="联系方式">
          <template v-if="status === 'create'">
            <span>{{reportForm.person_id | showInfo(userList, 'cellphone')}}</span>
          </template>
          <template v-else>
            <span>{{reportForm.cell_phone}}</span>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="举办时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.holding_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="举办事宜">
          <el-input v-model="reportForm.holding_matters"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="举办地点">
          <el-input v-model="reportForm.holding_address"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="基本情况">
          <el-input type="textarea" autosize v-model="reportForm.base_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="首次报告方式">
          <el-input v-model="reportForm.report_method"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="报告负责人">
          <el-input v-model="reportForm.report_principal"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="审核意见">
          <el-input type="textarea" autosize v-model="reportForm.audit_opinion"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="纪检监察机关备案意见">
          <el-input type="textarea" :autosize="{ minRows : 3 }" v-model="reportForm.record_suggest"></el-input>
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
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'ReportForm7',
  props: {
    reportForm: {
      type: Object,
      default() {
        return {
          rank: '',
          holding_time: '',
          holding_matters: '',
          holding_address: '',
          base_situation: '',
          report_method: '',
          report_principal: '',
          audit_opinion: '',
          record_suggest: '',
          person_id: '',
          unit_id: '',
          fileId: '',
          file_name: '',
          id: ''
        }
      }
    },
    user: {
      type: Array
    },
    status: {
      type: String,
      default: 'create'
    }
  },
  data() {
    return {
      fileUpload: '',
      archive_id: 13,
      userList:[],
      loading: false
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
      closeDialog: 'report/toggleDialog',
      closeDetail: 'report/closeDetail',getList: 'report/refreshList'
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
      let query = Object.assign(this.reportForm, param)
      // console.log(query)
      // return
      addRecord(query)
        .then(res => {
          const data = res.data
          if (data.success) {
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.$emit('closeLoad')
            this.getList()
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
      let query = Object.assign(this.reportForm, param)
      updateRecord(query).then(res => {
        const data = res.data
        if (data.success) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
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
