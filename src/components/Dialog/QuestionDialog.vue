<template>
  <el-dialog :visible.sync="dialogTableVisible" width="600px" center :before-close="closeDialog" v-el-drag-dialog>
    <div slot="title">
      <template v-if="status === 'create'">
        <el-select v-model="recordSelect" placeholder="请选择档案名称" @change="handleChange">
          <el-option v-for="re in recordNumber" :key="re.name" :label="re.name" :value="re.archive_id"></el-option>
        </el-select>
      </template>
      <div class="form-tit">{{titleChange}}</div>
    </div>
    <component :is="formComponent" :user="user" :status="status" ref="children" :questionForm="formVal" @closeLoad="closeLoading"></component>
    <div slot="footer" class="dialog-footer">
      <template v-if="status === 'create'">
        <el-button type="primary" @click="handleCreate" :loading="submitLoading">保 存</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </template>
      <template v-else-if="status === 'update'">
        <el-button type="primary" @click="handleUpdate">保 存</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </template>
      <template v-else-if="status === 'detail'"></template>
      <!-- <template v-if="recordSelect === 3">
        <div class="explain">
          <h5 class="explain-txt">填表说明:</h5>
          <p>1.本表供领导干部谈话提醒时填写，每次谈话均应有记录。</p>
          <p>2.涉及纪律类型从“六项纪律”（政治纪律、组织纪律、廉洁纪律、群众纪律、工作纪律、生活纪律）中选择填写，单项或多项均可。</p>
          <p>3.谈话方式为“咬耳扯袖”或者“红脸出汗”。</p>
        </div>
      </template> -->
    </div>
  </el-dialog>
</template>

<script>
import {
  QuestionForm1,
  QuestionForm2,
  QuestionForm3,
  QuestionForm4,
  QuestionForm5,
  QuestionForm6,
  QuestionForm7
} from '@/components/Form/Question/index'
import { mapState, mapActions, mapMutations } from 'vuex'
import elDragDialog from '@/directive/el-dragDialog'

export default {
  name: 'QuestionDialog',
  directives: { elDragDialog },
  components: {
    QuestionForm1,
    QuestionForm2,
    QuestionForm3,
    QuestionForm4,
    QuestionForm5,
    QuestionForm6,
    QuestionForm7
  },
  computed: {
    ...mapState({
      dialogTableVisible: state => state.question.dialogShow,
      status: state => state.question.status,
      type: state => state.question.questionForm,
      formVal: state => state.question.formVal,
      user: state => state.app.info
    }),
    recordSelect: {
      get() {
        return parseInt(this.type)
      },
      set(value) {
        return this.setQuestionForm(value)
      }
    },
    formComponent() {
      let obj = this.compareParam('archive_id', parseInt(this.type))
      return 'QuestionForm' + obj.type
    },
    titleChange() {
      let obj = this.compareParam('archive_id', parseInt(this.type))
      return obj.name
    }
  },
  data() {
    return {
      recordNumber: [
        {
          name: '廉政谈话情况',
          archive_id: 3,
          type: 1
        },
        {
          name: '提醒谈话情况',
          archive_id: 19,
          type: 1
        },
        {
          name: '诫勉谈话情况',
          archive_id: 20,
          type: 1
        },
        {
          name: '其他组织处理情况',
          archive_id: 21,
          type: 1
        },
        {
          name: '问责情况',
          archive_id: 4,
          type: 2
        },
        {
          name: '问题线索',
          archive_id: 1,
          type: 3
        },
        {
          name: '党风廉政意见回复',
          archive_id: 2,
          type: 4
        },
        {
          name: '信访举报调查处理情况',
          archive_id: 5,
          type: 5
        },
        {
          name: '谈话结果',
          archive_id: 6,
          type: 6
        },
        {
          name: '函询结果',
          archive_id: 24,
          type: 6
        },
        {
          name: '党纪处分情况',
          archive_id: 7,
          type: 7
        },
        {
          name: '政务处分情况',
          archive_id: 22,
          type: 7
        }  
      ],
      submitLoading: false
    }
  },
  methods: {
    ...mapMutations({
      closeDialog: 'question/toggleDialog',
      setQuestionForm: 'question/setQuestionForm',
      setFormVal: 'question/setFormVal'
    }),
    getForm() {},
    compareParam(param, comparam) {
      let titleObj = this.recordNumber.find(i => {
        return i[param] === comparam
      })
      return titleObj
    },
    handleChange(val) {
      this.setFormVal({})
    },
    handleCreate() {
      this.submitLoading = true
      this.$refs.children.createData()
    },
    handleUpdate() {
      this.$refs.children.updateData()
    },
    closeLoading() {
      this.submitLoading = false
    }
  }
}
</script>

<style>

</style>
