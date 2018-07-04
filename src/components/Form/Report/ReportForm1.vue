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
        <el-form-item label="身份证号码">
          <template v-if="status === 'create'">
            <span class="txt-number">{{reportForm.person_id | showInfo(userList, 'idcard')}}</span>
          </template>
          <template v-else>
            <span>{{reportForm.id_card}}</span>
          </template>

        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="工作单位">
          <template v-if="status === 'create'">
            <span>{{reportForm.person_id | showInfo(userList, 'unitname')}}</span>
          </template>
          <template v-else>
            <span>{{reportForm.unit_name}}</span>
          </template>

        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="职务">
          <template v-if="status === 'create'">
            <span>{{reportForm.person_id | showInfo(userList, 'position')}}</span>
          </template>
          <template v-else>
            <span>{{reportForm.position}}</span>
          </template>

        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="审计日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.audit_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="审计类型">
          <el-input v-model="reportForm.audit_type"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="审计年度">
          <el-input v-model="reportForm.audit_year"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="时任职务">
          <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.duty" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="本人是否存在问题">
          <el-radio-group v-model="reportForm.flag">
            <el-radio label="是">是</el-radio>
            <el-radio label="否">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="内容">
          <el-input type="textarea" autosize v-model="reportForm.problem"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="附件上传">
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
  name: 'ReportForm1',
  props: {
    reportForm: {
      type: Object,
      default() {
        return {
          born_time: '',
          audit_year: '',
          education: '',
          flag: '',
          origin: '',
          record_number: '',
          id_card: '',
          remark: '',
          audit_time: '',
          update_time: '',
          problem: '',
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
          create_user_id: '',
          ethnic: '',
          address: '',
          create_time: '',
          file_name: '',
          sex: '',
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
          dept_id: '',
          archive_id: '',
          audit_type: ''
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
  
  data() {
    return {
      fileUpload: '',
      archive_id: 8,
      userList:[],
      loading: false
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
            this.getList()
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
      let query = Object.assign(this.reportForm, param)
      // console.log(query)
      // return
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
