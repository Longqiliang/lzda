<template>
  <el-form :model="reportForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
    <el-row>
      <el-col :span="11">
        <el-form-item label="姓名">
          <el-input v-model="reportForm.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="身份证号码">
          <el-input v-model="reportForm.id_card"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-form-item label="工作单位">
          <el-input v-model="reportForm.unit_name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="职位">
          <el-input v-model="reportForm.position"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="主要任职情况">
          <el-input type="textarea" autosize v-model="reportForm.job_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="家庭成员情况">
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="本人参加各类学习培训情况">
          <el-input type="textarea" autosize v-model="reportForm.study_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="本人的婚姻变化情况">
          <el-input type="textarea" autosize v-model="reportForm.marriage_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="子女与外国人、无国籍人、港澳及台居民通婚情况">
          <el-input type="textarea" autosize v-model="reportForm.intermarriage_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="配偶、子女移居国（境）外情况">
          <el-input type="textarea" autosize v-model="reportForm.migrate_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="配偶、子女从业情况">
          <el-input type="textarea" autosize v-model="reportForm.business_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="配偶、子女被司法机关追究刑事责任情况">
          <el-input type="textarea" autosize v-model="reportForm.criminal_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="本人收入情况">
          <el-input type="textarea" autosize v-model="reportForm.income_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="本人、配偶、共同生活的子女房产情况">
          <el-input type="textarea" autosize v-model="reportForm.estate_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="本人、配偶共同生活的子女投资或者以其他方式持有有价证券、股票、期货、投资性保险以及其他金融理财产品情况">
          <el-input type="textarea" autosize v-model="reportForm.investment_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="配偶、共同生活的子女投资非上市公司、企业情况">
          <el-input type="textarea" autosize v-model="reportForm.enterprise_situation"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="配偶、共同生活的子女注册个体工商户、个人独资企业或合伙企业情况">
          <el-input type="textarea" autosize v-model="reportForm.partnership_situation"></el-input>
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
  name: 'ReportForm5',
  props: {
    reportForm: {
      type: Object,
      default() {
        return {
          born_time: '',
          education: '',
          record_number: '',
          income_situation: '',
          intermarriage_situation: '',
          file_type: '',
          estate_situation: '',
          rank: '',
          migrate_situation: '',
          employer: '',
          id: '',
          partnership_situation: '',
          marriage_situation: '',
          person_id: '',
          fileid: '',
          create_user_id: '',
          ethnic: '',
          create_time: '',
          enterprise_situation: '',
          cell_phone: '',
          unit_name: '',
          file_id: '',
          name: '',
          education_level: '',
          position: '',
          work_time: '',
          go_abroad_situation: '',
          origin: '',
          id_card: '',
          job_situation: '',
          remark: '',
          update_time: '',
          family_born_time: '',
          political_status: '',
          business_situation: '',
          investment_situation: '',
          study_situation: '',
          personid: '',
          relationship: '',
          unit_id: '',
          family_phone: '',
          archive_type_name: '',
          join_work_time: '',
          criminal_situation: '',
          address: '',
          file_name: '',
          sex: '',
          dept_name: '',
          contact_number: '',
          file_size: '',
          archive_name: '',
          family_address: '',
          reward_situation: '',
          dept_id: '',
          archive_id: '',
          username: ''
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
