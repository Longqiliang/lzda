<template>
  <el-dialog :visible.sync="dialogTableVisible" width="700px" center :before-close="closeDialog" v-el-drag-dialog>
    <div slot="title">
      <template v-if="status === 'create'">
        <el-select v-model="recordSelect" placeholder="请选择档案名称">
          <el-option v-for="re in recordNumber" :key="re.name" :label="re.name" :value="re.archive_id"></el-option>
        </el-select>
      </template>
      <div class="form-tit">{{titleChange}}</div>
    </div>
    <template v-if="status === 'create'">
      <component :is="formComponent" :user="user" :status="status" ref="children"></component>
    </template>
    <template v-else>
      <component :is="formComponent" :user="user" :status="status" ref="children" :reportForm="formVal"></component>
    </template>
    <div slot="footer" class="dialog-footer">
      <template v-if="status === 'create'">
        <el-button type="primary" @click="handleCreate">保 存</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </template>
      <template v-else-if="status === 'update'">
        <el-button type="primary" @click="handleUpdate">保 存</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </template>
      <!-- <template v-else>
        <el-button type="primary" @click="closeDialog">预 览</el-button>
        <el-button @click="closeDialog">导 出</el-button>
        <el-button @click="closeDialog">关 闭</el-button>
      </template> -->
      <template v-if="recordSelect === 6">
        <div class="explain">
          <h5 class="explain-txt">备注：</h5>
          <p>婚礼宴请人数单方累计不超过150人、双方同地合办不超过200人（按10人/桌计）；</p>
          <p> 婚礼标志车队规模总数不超过9辆。</p>
        </div>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import {
  ReportForm1,
  ReportForm2,
  ReportForm3,
  ReportForm4,
  ReportForm5,
  ReportForm6,
  ReportForm7
} from '@/components/Form/Report/index'
import { mapState, mapActions, mapMutations } from 'vuex'
import elDragDialog from '@/directive/el-dragDialog'

export default {
  name: 'ReportDialog',
  directives: {
    elDragDialog
  },
  components: {
    ReportForm1,
    ReportForm2,
    ReportForm3,
    ReportForm4,
    ReportForm5,
    ReportForm6,
    ReportForm7
  },
  computed: {
    ...mapState({
      dialogTableVisible: state => state.report.dialogShow,
      status: state => state.report.status,
      type: state => state.report.reportForm,
      formVal: state => state.report.formVal,
      user: state => state.app.info
    }),
    recordSelect: {
      get() {
        return parseInt(this.type)
      },
      set(value) {
        return this.setReportForm(value)
      }
    },
    formComponent() {
      let obj = this.compareParam('archive_id', parseInt(this.type))
      return 'ReportForm' + obj.type
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
          name: '领导干部任期或离任经济责任审计报告',
          archive_id: 8,
          type: 1
        },
        {
          name: '领导干部民主生活会发言材料及民主评议、民主测评情况',
          archive_id: 10,
          type: 2
        },
        {
          name: '述责述廉报告',
          archive_id: 11,
          type: 3
        },
        {
          name: '出国、赴台港澳备案情况',
          archive_id: 14,
          type: 4
        },
        {
          name: '个人事项报告',
          archive_id: 9,
          type: 5
        },
        {
          name: '婚嫁事宜报告表',
          archive_id: 12,
          type: 6
        },
        {
          name: '丧事办理报告表',
          archive_id: 13,
          type: 7
        }
      ]
    }
  },
  methods: {
    ...mapMutations({
      closeDialog: 'report/toggleDialog',
      setReportForm: 'report/setReportForm'
    }),
    getForm() {},
    compareParam(param, comparam) {
      let titleObj = this.recordNumber.find(i => {
        return i[param] === comparam
      })
      return titleObj
    },
    handleCreate() {
      this.$refs.children.createData()
    },
    handleUpdate() {
      this.$refs.children.updateData()
    }
  }
}
</script>

<style>

</style>
