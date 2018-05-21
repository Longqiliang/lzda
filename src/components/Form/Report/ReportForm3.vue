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
        <el-form-item label="职位">
          <el-input v-model="reportForm.position"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="职级">
          <el-input v-model="reportForm.rank"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="述责述廉时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.response_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="标题">
          <el-input v-model="reportForm.response_title"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="内容">
          <el-input type="textarea" autosize v-model="reportForm.response_content"></el-input>
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
export default {
  name: 'ReportForm3',
  props: {
    reportForm: {
      type: Object,
      default() {
        return {
          born_time: '',
          education: '',
          origin: '',
          record_number: '',
          id_card: '',
          remark: '',
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
          response_title: '',
          dept_name: '',
          contact_number: '',
          file_size: '',
          cell_phone: '',
          unit_name: '',
          response_content: '',
          archive_name: '',
          file_id: '',
          name: '',
          response_time: '',
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
      fileUpload: ''
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
    }
  }
}
</script>

<style>

</style>
