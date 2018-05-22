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
        <el-form-item label="问题线索来源">
          <el-input v-model="questionForm.rules_source"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="线索受理时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.accept_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="问题摘要">
          <el-input v-model="questionForm.problem_summary"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="问题线索来源单位或反映人">
          <el-input v-model="questionForm.rules_source_unit"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="调查情况（基本事实摘要）">
          <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="questionForm.investigation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="承办单位">
          <el-input v-model="questionForm.organizer"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="办结时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.completion_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="属实程度">
          <el-input v-model="questionForm.true_degree"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="存在问题类型">
          <el-input v-model="questionForm.problem_type"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="是否立案">
          <el-radio-group v-model="questionForm.flag">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="立案时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.filing_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="四种形态类型">
          <el-input v-model="questionForm.shape_type"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="通报曝光情况">
          <el-input v-model="questionForm.exposure_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="通报曝光类型">
          <el-input v-model="questionForm.exposure_type"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="通报曝光范围">
          <el-input v-model="questionForm.exposure_scope"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="处理情况">
          <el-input v-model="questionForm.handle_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item label="处理机关">
          <el-input v-model="questionForm.handle_agency"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="处分文号">
          <el-input v-model="questionForm.PUBLISH_NUMBER"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="处分起始时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.publish_starttime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="处分终止时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.publish_endtime" style="width: 100%;"></el-date-picker>
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
  name: 'QuestionForm3',
  props: {
    questionForm: {
      type: Object,
      default() {
        return {
            born_time: "", 
            education: "", 
            completion_time: "", 
            problem_summary: "", 
            record_number: "", 
            filing_time: "", 
            file_type: "", 
            rank: "", 
            id: "", 
            exposure_situation: "", 
            publish_starttime: "", 
            person_id: "", 
            fileid: "", 
            create_user_id: "", 
            ethnic: "", 
            create_time: "", 
            rules_source: "", 
            exposure_type: "", 
            publish_endtime: "", 
            cell_phone: "", 
            unit_name: "", 
            rules_source_people: "", 
            file_id: "", 
            name: "", 
            shape_type: "", 
            problem_type: "", 
            position: "", 
            work_time: "", 
            flag: "", 
            origin: "", 
            id_card: "", 
            handle_situation: "", 
            remark: "", 
            exposure_scope: "", 
            update_time: "", 
            political_status: "", 
            personid: "", 
            true_degree: "", 
            unit_id: "", 
            accept_time: "", 
            archive_type_name: "", 
            join_work_time: "", 
            address: "", 
            file_name: "", 
            sex: "", 
            dept_name: "", 
            contact_number: "", 
            file_size: "", 
            archive_name: "", 
            organizer: "", 
            investigation: "", 
            handle_agency: "", 
            dept_id: "", 
            archive_id: "", 
            rules_source_unit: "", 
            publish_number: ""
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
