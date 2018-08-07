<template>
  <el-form :model="reportForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="姓名">
          <template v-if="status === 'create'">
            <el-select v-model="reportForm.person_id" filterable remote :remote-method="remoteMethod" :loading="loading">
              <el-option v-for="(item, i) in userList" :key="i" :label="item.name" :value="item.id"></el-option>
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
        <el-form-item label="联系电话">
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
        <el-form-item label="是否单位负责人" label-width="120px">
          <el-select v-model="reportForm.person_charge" placeholder="">
            <el-option v-for="(pe, p) in person_charge" :key="p" :label="pe.label" :value="pe.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="职务补充说明">
          <el-input v-model="reportForm.job_supplementation" ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11" >
        <el-form-item label="举办事宜">
          <el-input v-model="reportForm.holding_matters"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="举办时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.holding_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="举办地点">
          <el-input v-model="reportForm.holding_address"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="酒店星级">
          <el-select v-model="reportForm.star_number">
            <el-option v-for="(nu,n) in star_number" :key="n" :value="nu.value" :label="nu.label"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="单方预计开支">
          <el-input v-model="reportForm.single_expenditure"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="参加人数">
          <el-input v-model="reportForm.person_number"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="双方预计开支">
          <el-input v-model="reportForm.double_expenditure"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="邀请范围">
          <el-input v-model="reportForm.scope_invitation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="报告状态">
          <el-select v-model="reportForm.reporting_state">
            <el-option v-for="(st,s) in reporting_state" :key="s" :label="st.label" :value="st.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="其他说明">
          <el-input v-model="reportForm.information_other" ></el-input>
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
      archive_id: 23,
      userList:[],
      loading: false,
      person_charge:[{
        label:'是',
        value: '1'
      },{
        label:'否',
        value: '1'
      }],
      reporting_state:[{
        label:'未报告',
        value: '1'
      },{
        label: '已报告',
        value: '2'
      }],
      star_number:[{
        label: '一星级',
        value: '1'
      },{
        label: '二星级',
        value: '2'
      },{
        label: '三星级',
        value: '3'
      },{
        label: '四星级',
        value: '4'
      },{
        label: '五星级',
        value: '5'
      }]
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
