<template>
  <el-form :model="superviseForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="姓名">
          <template v-if="status === 'create'">
            <el-select v-model="superviseForm.person_id" filterable remote :remote-method="remoteMethod" :loading="loading">
              <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </template>
          <template v-else>
            <span>{{superviseForm.name}}</span>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="工作单位">
          <template v-if="status === 'create'">
            <span>{{superviseForm.person_id | showInfo(userList, 'unitname')}}</span>
          </template>
          <template v-else>
            <span>{{superviseForm.unit_name}}</span>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="通报曝光时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="superviseForm.exposure_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="通报曝光载体">
          <el-input v-model="superviseForm.exposure_carrier"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="主要问题类型">
          <el-select  v-model="superviseForm.problem_type">
            <el-option v-for="dis in problemList" :key="dis.label" :label="dis.label" :value="dis.label"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="23">
        <el-form-item label="通报曝光内容">
          <el-input type="textarea" :autosize="{ minRows: 6 }" v-model="superviseForm.exposure_content"></el-input>
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
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  'supervise'
)

export default {
  name: 'SuperviseForm2',
  props: {
    user: {
      type: Array
    },
    superviseForm: {
      type: Object,
      default() {
        return {
          name: '',
          id_card: '',
          unit_name: '',
          position: '',
          exposure_time: '',
          exposure_carrier: '',
          problem_type: '',
          exposure_content: '',
          person_id: '',
          unit_id: '',
          fileId: '',
          file_name: '',
          id: ''
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
  inject: ['getList'],
  data() {
    return {
      fileUpload: '',
      archive_id: 16,
      userList:[],
      loading: false,
      problemList:[
          {
          label: '政治纪律'
        },
           {
          label: '组织纪律'
        },
           {
          label: '廉洁纪律'
        },
           {
          label: '群众纪律'
        },
           {
          label: '工作纪律'
        },
           {
          label: '生活纪律'
        },
           {
          label: '贪污贿赂'
        },
           {
          label: '渎职侵权'
        },
           {
          label: '其他'
        }
      ]
    }
  },
  methods: {
    ...mapMutations({
      closeDialog: 'toggleDialog',
      closeDetail: 'closeDetail'
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
      let query = Object.assign(this.superviseForm, param)
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
      let query = Object.assign(this.superviseForm, param)
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
