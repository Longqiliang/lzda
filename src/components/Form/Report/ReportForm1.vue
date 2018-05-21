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
          <el-input v-model="reportForm.rank"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="审计日期">
          <el-input v-model="reportForm.audit_time"></el-input>
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
          <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.position" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="内容">
          <el-radio-group v-model="reportForm.flag">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
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
export default {
  name: 'ReportForm1',
  props: {
    reportForm: {
      type: Object,
      default() {
        return {
          "born_time": "",
          "audit_year": "",
          "education": "",
          "flag": "",
          "origin": "",
          "record_number": "",
          "id_card": "",
          "remark": "",
          "audit_time": "",
          "update_time": "",
          "problem": "",
          "political_status": "",
          "file_type": "",
          "rank": "",
          "personid": "1",
          "id": "1",
          "unit_id": "2",
          "person_id": "1",
          "fileid": "",
          "archive_type_name": "",
          "join_work_time": 1336233600000,
          "create_user_id": "",
          "ethnic": "",
          "address": "",
          "create_time": "",
          "file_name": "",
          "sex": "",
          "dept_name": "",
          "contact_number": "",
          "file_size": "",
          "cell_phone": "",
          "unit_name": "",
          "archive_name": "",
          "file_id": "",
          "name": "",
          "position": "",
          "work_time": "",
          "dept_id": "",
          "archive_id": "",
          "audit_type": ""
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
