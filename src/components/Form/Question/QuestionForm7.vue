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
        <el-form-item label="违纪行为">
          <el-input v-model="questionForm.disciplinary_action"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="违法行为">
          <el-input v-model="questionForm.illegal_action"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="处分类型">
          <el-input v-model="questionForm.disciplinary_type"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="案件性质">
          <el-input v-model="questionForm.cause_natrue"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="处分机关">
          <el-input v-model="questionForm.agency"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="处分文号">
          <el-input v-model="questionForm.disciplinary_number"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="处分起始时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.start_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="处分终止时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.end_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="违纪事实">
          <el-input v-model="questionForm.disciplinary_facts"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="处理情况">
          <el-input type="textarea" autosize v-model="questionForm.situation"></el-input>
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
  name: 'QuestionForm7',
  props: {
    questionForm: {
      type: Object,
      default() {
        return {
            born_time: "", 
            education: "", 
            origin: "", 
            record_number: "", 
            disciplinary_type: "", 
            id_card: "", 
            remark: "", 
            update_time: "", 
            political_status: "", 
            file_type: "", 
            rank: "", 
            personid: "", 
            id: "", 
            disciplinary_number: "", 
            illegal_action: "", 
            unit_id: "", 
            situation: "", 
            person_id: "", 
            fileid: "", 
            archive_type_name: "", 
            join_work_time: "", 
            create_user_id: "", 
            ethnic: "", 
            address: "", 
            agency: "", 
            create_time: "", 
            cause_natrue: "", 
            file_name: "", 
            sex: "", 
            disciplinary_action: "", 
            end_time: "", 
            dept_name: "", 
            contact_number: "", 
            file_size: "", 
            cell_phone: "", 
            unit_name: "", 
            start_time: "", 
            disciplinary_facts: "", 
            archive_name: "", 
            file_id: "", 
            name: "", 
            position: "", 
            work_time: "", 
            dept_id: "", 
            archive_id: ""
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
