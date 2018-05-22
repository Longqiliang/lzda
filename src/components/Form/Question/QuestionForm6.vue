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
        <el-form-item label="谈话时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.interviews_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="类型">
          <el-select v-model="questionForm.interviews_type">
            <el-option v-for="ta in talkType" :key="ta.label" :label="ta.label" :value="ta.label"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="事由">
          <el-input v-model="questionForm.interviews_cause"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="内容">
          <el-input type="textarea" autosize v-model="questionForm.interviews_context"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="结果">
          <el-input type="textarea" autosize v-model="questionForm.interviews_result"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="附件">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" ref="upload" :on-error="errorUpload" :on-success="successUpload" :on-remove="removeFile">
            <el-col :span="10">
              <el-input v-model="fileUpload" readonly></el-input>
            </el-col>
            <el-col :span="14">
              <el-button>上传附件</el-button>
              <span>谈话笔录/函询扫描件</span>
            </el-col>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

</template>

<script>
export default {
  name: 'QuestionForm6',
  props: {
    questionForm: {
      type: Object,
      default() {
        return {
           born_time : "", 
           education :  "" , 
           origin :  "" , 
           record_number :  "" , 
           id_card :  "" , 
           interviews_type : "", 
           remark : "", 
           update_time : "", 
           political_status :  "" , 
           interviews_time : "", 
           interviews_result : "", 
           file_type : "", 
           rank :  "" , 
           personid :  "" , 
           id :  "" , 
           unit_id :  "" , 
           person_id :  "" , 
           fileid : "", 
           archive_type_name :  "" , 
           join_work_time : "", 
           create_user_id : "", 
           ethnic :  "" , 
           address :  "" , 
           create_time : "", 
           file_name : "", 
           sex :  "" , 
           interviews_context : "", 
           dept_name :  "" , 
           contact_number :  "" , 
           file_size : "", 
           cell_phone :  "" , 
           unit_name :  "" , 
           archive_name :  "" , 
           file_id : "", 
           name :  "" , 
           position :  "" , 
           work_time :  "" , 
           interviews_cause : "", 
           dept_id :  "" , 
           archive_id :  "" 
        }
      }
    }
  },
  data() {
    return {
      fileUpload: '',
      talkType: [
        {
          label: '谈话'
        },
        {
          label: '函询'
        }
      ]
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
