<template>
  <el-dialog :visible.sync="DialogVisible" width="40%" center :before-close="closeDialog">
    <div slot="title">
      <el-select v-model="recordSelect" placeholder="请选择档案名称" @change="handleSelect">
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
      <template v-else>
        <el-button type="primary" @click="closeDialog">预 览</el-button>
        <el-button @click="closeDialog">导 出</el-button>
        <el-button @click="closeDialog">关 闭</el-button>
      </template>
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

export default {
  name: 'ReportDialog',
  components: {
    ReportForm1,
    ReportForm2,
    ReportForm3,
    ReportForm4,
    ReportForm5,
    ReportForm6,
    ReportForm7
  },
  mounted() {
    this.recordSelect = this.recordNumber[0].archive_id
  },
  computed: {
    formComponent() {
      let obj = this.compareParam('archive_id', this.recordSelect)
      return 'ReportForm' + obj.type
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
      ],
      recordSelect: 1,
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
    },
    handleSelect(e) {
      // console.log(e)
      // console.log(this.recordSelect)
    }
  }
}
</script>

<style>

</style>
