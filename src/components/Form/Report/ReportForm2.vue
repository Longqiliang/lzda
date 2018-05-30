<template>
  <el-form :model="reportForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="姓名">
          <el-input v-model="reportForm.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="身份证号码">
          <el-input v-model="reportForm.id_card"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="工作单位">
          <el-input v-model="reportForm.unit_name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="职务">
          <el-input v-model="reportForm.position"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="参加时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.join_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>

        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="时任职务">
          <el-input v-model="reportForm.position"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="发言材料">
          <el-input type="textarea" autosize v-model="reportForm.speech_material"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="民主评议、测评">
          <el-input type="textarea" autosize v-model="reportForm.life_comment"></el-input>
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
export default {
  name: 'ReportForm2',
  props: {
    reportForm: {
      type: Object,
      default() {
        return {
          born_time: '',
          education: '',
          speech_material: '',
          origin: '',
          record_number: '',
          id_card: '',
          remark: '',
          join_time: '',
          update_time: '',
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
          life_comment: '',
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
          archive_id: ''
        }
      }
    }
  },
  data() {
    return {
      fileUpload: '',
      archive_id: 10
    }
  },
  methods: {
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
      return
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
      updateRecord(query).then(res => {
        const data = res.data
        if (data.success) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
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
