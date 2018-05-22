<template>
  <el-form :model="questionForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="信访编号">
          <el-input v-model="questionForm.letter_number"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="信访时间">
          <el-date-picker v-model="questionForm.letter_time" placeholder="请选择信访时间" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="信访来源">
          <el-input v-model="questionForm.letter_source"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="被反映人姓名">
          <el-input v-model="questionForm.record_user_id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="被反映人职务">
          <el-input v-model="questionForm.rank"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="被反映人单位">
          <el-input v-model="questionForm.unit_name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="反映人姓名">
          <el-input v-model="questionForm.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="反映人电话">
          <el-input v-model="questionForm.cell_phone"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="调查情况及结论">
          <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="questionForm.investigation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="处理结果">
          <el-input type="textarea" autosize v-model="questionForm.result"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="备注">
          <el-input type="textarea" autosize v-model="questionForm.remark"></el-input>
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
  name: 'QuestionForm5',
  props: {
    questionForm: {
      type: Object,
      default() {
        return  {
           born_time : "",
           education :  "" ,
           origin :  "" ,
           record_number :  "" ,
           id_card :  "" ,
           letter_time : "",
           remark : "",
           result : "",
           letter_number : "",
           update_time : "",
           political_status :  "" ,
           file_type : "",
           rank :  "" ,
           personid :  "" ,
           id :  "" ,
           unit_id :  "" ,
           letter_source : "",
           person_id :  "" ,
           fileid : "",
           archive_type_name :  "" ,
           join_work_time : "",
           ethnic :  "" ,
           address :  "" ,
           create_time : "",
           file_name : "",
           sex :  "" ,
           dept_name :  "" ,
           record_user_id : "",
           contact_number :  "" ,
           file_size : "",
           cell_phone :  "" ,
           unit_name :  "" ,
           archive_name :  "" ,
           file_id : "",
           name :  "" ,
           investigation : "",
           position :  "" ,
           work_time :  "" ,
           dept_id :  "" ,
           archive_id :  "" 
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
