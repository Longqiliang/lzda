<template>
  <el-form :model="reportForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="姓名">
          <el-input v-model="reportForm.creat_user_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="身份证号码">
          <el-input v-model="reportForm.record_user_id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="备案时间">
          <el-input v-model="reportForm.talk_time"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="出访目的地">
          <el-input v-model="reportForm.talk_type"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="出访事由">
          <el-input v-model="reportForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="发证机关">
          <el-input v-model="reportForm.record_user_id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="证件有效期">
          <el-input v-model="reportForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="停留时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.talk_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="个人在国（境）外情况">
          <el-input type="textarea" autosize v-model="reportForm.remark"></el-input>
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
  name: 'ReportForm4',
  props: {
    reportForm: {
      type: Object,
      default() {
        return {
          talk_time: '',
          talk_type: '',
          remark: '',
          talk_user_id: '',
          record_user_id: '',
          create_time: '',
          update_time: '',
          upload_user_id: '',
          talk_reason: ''
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
