<template>
  <el-form :model="questionForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="姓名">
          <el-input v-model="questionForm.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="单位职务">
          <el-input v-model="questionForm.position"></el-input>
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
          <el-input v-model="questionForm.rank"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="政治面貌">
          <el-input v-model="questionForm.political_status"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="谈话方式">
          <el-select v-model="questionForm.talk_type">
            <el-option v-for="ta in talkType" :key="ta.label" :label="ta.label" :value="ta.label"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="谈话内容">
          <el-input type="textarea" :autosize="{ minRows: 3}" v-model="questionForm.talk_reason"></el-input>
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
            born_time: "", 
            education: "", 
            origin: "", 
            record_number: "", 
            id_card: "", 
            remark: "", 
            talk_type: "", 
            talk_reason: "", 
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
            ethnic: "", 
            address: "", 
            create_time: "", 
            file_name: "", 
            sex: "", 
            dept_name: "", 
            record_user_id: "", 
            contact_number: "", 
            file_size: "", 
            cell_phone: "", 
            unit_name: "", 
            upload_user_id: "", 
            archive_name: "", 
            file_id: "", 
            name: "", 
            position: "", 
            work_time: "", 
            talk_user_id: "", 
            dept_id: "", 
            talk_time: "", 
            archive_id: ""
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
