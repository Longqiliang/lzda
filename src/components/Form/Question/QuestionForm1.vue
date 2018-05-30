<template>
  <div>
    <el-form :model="questionForm" size="mini" label-width="90px" label-position="left" class="demo-form-inline">
      <el-row>
        <el-col :span="11">
          <el-form-item label="姓名">
            <template v-if="status === 'create'">
              <el-select v-model="questionForm.person_id" filterable >
                <el-option v-for="item in user" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </template>
            <template v-else>
              <span>{{questionForm.name}}</span>
            </template>

          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="职务">
            <template v-if="status === 'create'">
              <span>{{questionForm.person_id | showInfo(user, 'position')}}</span>
            </template>
            <template v-else>
              <span>{{questionForm.position}}</span>
            </template>

          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="职级">
            <template v-if="status === 'create'">
              <span>{{questionForm.person_id | showInfo(user, 'rank')}}</span>
            </template>
            <template v-else>
              <span>{{questionForm.rank}}</span>
            </template>

          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="政治面貌">
            <template v-if="status === 'create'">
              <span>{{questionForm.person_id | showInfo(user, 'politicalstatus')}}</span>
            </template>
            <template v-else>
              <span>{{questionForm.politicalstatus}}</span>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="谈话时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="questionForm.talk_time" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
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
            <el-input type="textarea" :autosize="{ minRows: 3 }" v-model="questionForm.talk_reason"></el-input>
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
  </div>

</template>

<script>
import { addRecord, updateRecord } from '@/api/article'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'QuestionForm1',
  props: {
    user: {
      type: Array
    },
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
    },
    status: {
      type: String,
      default: 'create'
    }
  },
  filters: {
    showInfo(id, user, arg) {
      if (!id) {
        return
      }
      const item = user.find(item => {
        return item.id === id
      })
      return item[arg]
    }
  },
  inject: ['getList'],
  created() {},
  data() {
    return {
      talkType: [
        {
          label: '廉政谈话'
        },
        {
          label: '提醒谈话'
        },
        {
          label: '诫勉谈话'
        }
      ],
      archive_id: 3
    }
  },
  methods: {
    ...mapMutations({
      closeDialog: 'question/toggleDialog',
      closeDetail: 'question/closeDetail'
    }),
    successUpload(response, file, fileList) {
      console.log(response, file, fileList)
    },
    errorUpload(err, file, fileList) {
      console.log(err, file, fileList)
    },
    createData() {
      let param = {
        archive_id: this.archive_id
      }
      let query = Object.assign(this.questionForm, param)
      // console.log(query)
      // return
      addRecord(query)
        .then(res => {
          const data = res.data
          if (data.success) {
            this.getList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.closeDialog()
            this.closeDetail()
          } else {
            this.$notify({
              title: '失败',
              message: '创建失败，请重试！',
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(err => {
          this.$notify({
            title: '失败',
            message: '创建失败，请重试！',
            type: 'error',
            duration: 2000
          })
        })
    },
    updateData() {
      let param = {
        archive_id: this.archive_id
      }
      let query = Object.assign(this.questionForm, param)
      // console.log(query)
      // return
      updateRecord(query).then(res => {
        const data = res.data
        if (data.success) {
          this.getList()
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.closeDialog()
          this.closeDetail()
        } else {
          this.$notify({
            title: '失败',
            message: '修改失败，请重试',
            type: 'error',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
