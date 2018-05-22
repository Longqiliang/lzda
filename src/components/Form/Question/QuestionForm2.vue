<template>
  <el-form :model="questionForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="姓名">
          <el-input v-model="questionForm.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="身份证号码">
          <el-input v-model="questionForm.id_card"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="工作单位">
          <el-input v-model="questionForm.unit_name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="职位">
          <el-input v-model="questionForm.position"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="问责类型">
          <el-input v-model="questionForm.account_type"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="问责事由">
          <el-input v-model="questionForm.account_cause"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="处理机关">
          <el-input v-model="questionForm.account_agency"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="处理时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.handle_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="问题内容">
          <el-input type="textarea" autosize v-model="questionForm.problem_context"></el-input>
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
export default {
  name: 'QuestionForm2',
  props: {
    questionForm: {
      type: Object,
      default() {
        return {
            handle_time: "", 
            born_time: "", 
            account_type: "", 
            education: "", 
            origin: "", 
            record_number: "", 
            id_card: "", 
            remark: "", 
            title: "", 
            update_time: "", 
            political_status: "", 
            file_type: "", 
            rank: "", 
            personid: "", 
            id: "", 
            unit_id: "", 
            person_id: "", 
            fileid: "", 
            archive_type_name: "", 
            join_work_time: "", 
            create_user_id: "", 
            ethnic: "", 
            address: "", 
            create_time: "", 
            file_name: "", 
            sex: "", 
            dept_name: "", 
            contact_number: "", 
            account_cause: "", 
            file_size: "", 
            cell_phone: "", 
            unit_name: "", 
            account_agency: "", 
            archive_name: "", 
            file_id: "", 
            name: "", 
            position: "", 
            work_time: "", 
            dept_id: "", 
            archive_id: "", 
            problem_context: ""
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
