<template>
  <el-form :model="questionForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="姓名">
          <el-input v-model="questionForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="单位职务">
          <el-input v-model="questionForm.record_user_id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="谈话时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.talk_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="谈话地点">
          <el-input v-model="questionForm.talk_type"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="谈话人">
          <el-input v-model="questionForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="记录人">
          <el-input v-model="questionForm.record_user_id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="职级">
          <el-input v-model="questionForm.talk_user_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="政治面貌">
          <el-input v-model="questionForm.record_user_id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="谈话方式">
          <el-select v-model="questionForm.type">
            <el-option v-for="ta in talkType" :key="ta.label" :label="ta.label" :value="ta.label"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="谈话内容">
          <el-input type="textarea" :autosize="{ minRows: 3}" v-model="questionForm.remark"></el-input>
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
          <el-upload action="/" ref="upload" :on-error="errorUpload">
            <el-button>上传附件</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'QuestionForm1',
  props: {
    questionForm: {
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
      talkType: [
        {
          label: '咬耳扯袖'
        },
        {
          label: '红脸出汗'
        }
      ]
    }
  },
  methods: {
    successUpload(response, file, fileList) {
      console.log(response, file, fileList)
    },
    errorUpload(err, file, fileList) {
      console.log(err, file, fileList)
    }
  }
}
</script>

<style>

</style>
