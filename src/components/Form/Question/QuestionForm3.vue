<template>
  <el-form :model="questionForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="姓名">
          <el-input v-model="questionForm.creat_user_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="身份证号码">
          <el-input v-model="questionForm.record_user_id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="工作单位">
          <el-input v-model="questionForm.talk_time"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="职位">
          <el-input v-model="questionForm.talk_type"></el-input>
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
          <el-input v-model="questionForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="调查情况（基本事实摘要）">
          <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="questionForm.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="承办单位">
          <el-input v-model="questionForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="办结时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.talk_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="属实程度">
          <el-input v-model="questionForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="存在问题类型">
          <el-input v-model="questionForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="是否立案">
          <el-radio-group v-model="questionForm.talk_user_id">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="立案时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.talk_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="四种形态类型">
          <el-input v-model="questionForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="通报曝光情况">
          <el-input v-model="questionForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="通报曝光类型">
          <el-input v-model="questionForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="通报曝光范围">
          <el-input v-model="questionForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="处理情况">
          <el-input v-model="questionForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item label="处理机关">
          <el-input v-model="questionForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="处分文号">
          <el-input v-model="questionForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="处分起始时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.talk_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="处分终止时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.talk_time" style="width: 100%;"></el-date-picker>
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
          problem_summary: '',
          rules_source: '',
          accept_time: '',
          rules_source_unit: '',
          rules_source_people: '',
          investigation: '',
          organizer: '',
          completion_time: '',
          true_degree: '',
          problem_type: '',
          flag: '',
          filing_time: '',
          shape_type: '',
          exposure_situation: '',
          exposure_type: '',
          exposure_scope: '',
          handle_situation: '',
          handle_agency: '',
          publish_number: '',
          publish_starttime: '',
          publish_endtime: ''
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
