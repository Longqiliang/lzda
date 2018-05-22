<template>
  <el-form :model="reportForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="姓名">
          <el-input v-model="reportForm.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="政治面貌">
          <el-input v-model="reportForm.political_status"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="单位及职务">
          <el-input v-model="reportForm.talk_time"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="联系方式">
          <el-input v-model="reportForm.contact_number"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="举办时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.holding_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="举办事宜">
          <el-input v-model="reportForm.holding_matter"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="举办地点">
          <el-input v-model="reportForm.holding_address"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="基本情况">
          <el-input type="textarea" autosize v-model="reportForm.base_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="首次报告方式">
          <el-input v-model="reportForm.report_method"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="报告负责人">
          <el-input v-model="reportForm.report_principal"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="审核意见">
          <el-input type="textarea" autosize v-model="reportForm.audit_opinion"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="纪检监察机关备案意见">
          <el-input type="textarea" :autosize="{ minRows : 3 }" v-model="reportForm.record_suggest"></el-input>
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
  name: 'ReportForm7',
  props: {
    reportForm: {
      type: Object,
      default() {
        return {
          name: '',
          political_status: '',
          unit_name: '',
          rank: '',
          contact_number: '',
          holding_time: '',
          holding_matter: '',
          holding_address: '',
          base_situation: '',
          report_method: '',
          report_principal: '',
          audit_opinion : '',
          record_suggest: '',
          person_id: '',
          unit_id: '',
          fileId: '',
          file_name:'',
          id : ''
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
