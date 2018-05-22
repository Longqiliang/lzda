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
        <el-form-item label="来文单位">
          <el-input v-model="questionForm.communication_dept"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="来文时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.receipt_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="来文内容">
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
    <el-row>
      <el-col :span="23">
        <el-form-item label="审核类型">
          <el-input type="textarea" autosize v-model="questionForm.audit_type"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="回复意见">
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
  name: 'QuestionForm4',
  props: {
    questionForm: {
      type: Object,
      default() {
        return {
            receipt_time: "", 
            born_time: "", 
            education: "", 
            origin: "", 
            record_number: "", 
            id_card: "", 
            remark: "", 
            update_time: "", 
            political_status: "", 
            file_type: "", 
            communication_content: "", 
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
            file_size: "", 
            cell_phone: "", 
            opinion: "", 
            unit_name: "", 
            archive_name: "", 
            file_id: "", 
            name: "", 
            position: "", 
            work_time: "", 
            communication_dept: "", 
            dept_id: "", 
            archive_id: "", 
            audit_type: ""
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
