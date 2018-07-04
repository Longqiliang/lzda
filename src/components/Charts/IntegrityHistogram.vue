<template>
  <div>
    <ve-histogram :data="chartData" :events="chartEvents" :data-zoom="dataZoom" :legend-visible="false" :settings="chartSettings" height="100%"></ve-histogram>
    <el-dialog :visible.sync="listVisible" :title="title" center v-el-drag-dialog>
      <el-table :data="tableVal" border>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="身份证号码" prop="id_card" align="center"></el-table-column>
        <el-table-column label="单位" prop="unit_name" align="center"></el-table-column>
        <el-table-column label="职务" prop="position" align="center"></el-table-column>
        <el-table-column label="廉情指标" prop="archive_name" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="handleLook(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>

</template>

<script>
import 'echarts/lib/component/dataZoom'
import { queryUnitAnalysisList, queryRecordDetails } from '@/api/article'
import elDragDialog from '@/directive/el-dragDialog'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('question')
export default {
  directives:{
    elDragDialog
  },
  props: {
    data: {
      type: Array
    }
  },
  data() {
    this.dataZoom = [
      {
        type: 'slider',
        start: 0,
        end: 15
      }
    ]
    this.chartSettings = {
      stack: {
        廉情分析: ['zzcount', 'wzcount', 'djcount', 'sfcount', 'zjcount']
      },
      labelMap: {
        zzcount: '组织措施情况',
        wzcount: '受到问责情况',
        djcount: '受到党纪处分情况',
        sfcount: '移送司法情况',
        zjcount: '受到政务处分情况'
      }
    }
    let self = this
    this.chartEvents = {
      click: function(e) {
        self.title = e.name
        self.unitId = self.arrFindof(e.name)
        self.getList()
      }
    }
    return {
      chartData: {
        columns: [
          'unit_name',
          'zzcount',
          'wzcount',
          'djcount',
          'sfcount',
          'zjcount'
        ],
        rows: []
      },
      tableVal: null,
      listVisible: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      total: null,
      unitId: '',
      title: ''
    }
  },
  created() {
    this.initChart()
  },
  methods: {
    ...mapMutations([
      'toggleDialog',
      'setStatus',
      'setQuestionForm',
      'setFormVal'
    ]),
    arrFindof(val) {
      let newObj = this.chartData.rows.find(e => {
        return e.unit_name === val
      })
      return newObj.unit_id
    },
    getList() {
      let query = Object.assign({ unit_id: this.unitId }, this.listQuery)
     queryUnitAnalysisList(query).then(res => {
        const data = res.data
        if (data.success) {
          this.tableVal = data.data
          this.total = data.allsize
          this.listVisible = true
        }
      })
    },
    handleLook(row) {
      let query = {
        archive_type_id: row.archive_type_id,
        person_id: row.person_id,
        archive_id: row.archive_id,
        buss_id: row.bussid
      }
      queryRecordDetails(query).then(res => {
        let data = res.data
        if (data.success) {
          this.setStatus('detail')
          this.setQuestionForm(row.archive_id)
          this.setFormVal(data.data)
          this.toggleDialog()
        }
      })
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getList()
    },
    initChart() {
      this.chartData.rows = this.data
    }
  }
}
</script>

<style>

</style>
