<template>
  <el-dialog :visible.sync="DialogVisible" width="40%" center :before-close="closeDialog">
    <div slot="title">
      <el-select v-model="recordSelect" placeholder="请选择档案名称">
        <el-option v-for="re in recordNumber" :key="re.name" :label="re.name" :value="re.archive_id"></el-option>
      </el-select>
      <div class="form-tit">{{titleChange}}</div>
    </div>
    <keep-alive>
      <component :is="formComponent"></component>
    </keep-alive>
    <div slot="footer" class="dialog-footer">
      <template v-if="status === 'create'">
        <el-button type="primary" @click="closeDialog">保 存</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </template>
      <template v-if="recordSelect === 3">
        <div class="explain">
          <h5 class="explain-txt">填表说明:</h5>
          <p>1.本表供领导干部谈话提醒时填写，每次谈话均应有记录。</p>
          <p>2.涉及纪律类型从“六项纪律”（政治纪律、组织纪律、廉洁纪律、群众纪律、工作纪律、生活纪律）中选择填写，单项或多项均可。</p>
          <p>3.谈话方式为“咬耳扯袖”或者“红脸出汗”。</p>
        </div>
      </template>
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

export default {
  name: 'QuestionDialog',
  components: {
    QuestionForm1,
    QuestionForm2,
    QuestionForm3,
    QuestionForm4,
    QuestionForm5,
    QuestionForm6,
    QuestionForm7
  },
  mounted() {
    this.recordSelect = this.recordNumber[0].archive_id
  },
  computed: {
    formComponent() {
      let obj = this.compareParam('archive_id', this.recordSelect)
      return 'QuestionForm' + obj.type
    },
    titleChange() {
      let obj = this.compareParam('archive_id', this.recordSelect)
      return obj.name
    }
  },
  props: {
    DialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recordNumber: [
        {
          name: '领导干部廉政谈话、提醒谈话、诫勉谈话情况',
          archive_id: 3,
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
          name: '谈话函询结果',
          archive_id: 6,
          type: 6
        },
        {
          name: '受到党纪政务处分情况',
          archive_id: 7,
          type: 7
        }
      ],
      recordSelect: 3,
      status: {
        type: String,
        default: 'detail'
      }
    }
  },
  methods: {
    compareParam(param, comparam) {
      let titleObj = this.recordNumber.find(i => {
        return i[param] === comparam
      })
      //console.log(titleObj)
      return titleObj
    },
    closeDialog() {
      this.$emit('update:DialogVisible', false)
    }
  }
}
</script>

<style>

</style>
