<template>
  <div>
    <ve-bar :data="chartData" :events="chartEvents" :xAxis="xAxis" :legend-visible="false" :settings="chartSettings" height="100%"></ve-bar>
    <el-dialog :visible.sync="listVisible" :title="title" center v-el-drag-dialog>
      <el-table :data="tableVal" border>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="身份证号码" prop="id_card" align="center"></el-table-column>
        <el-table-column label="单位" prop="unit_name" align="center"></el-table-column>
        <el-table-column label="职务" prop="position" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="handleLook(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-footer">
        <el-pagination background :total="total" :current-page="listQuery.pageIndex" :page-size="listQuery.pageSize" layout="total, pager, ->, jumper" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { queryLowIndexList, queryRecordDetails } from '@/api/article'
import elDragDialog from '@/directive/el-dragDialog'
import { mapMutations } from 'vuex'
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
    this.xAxis = {
      show: false
    }
    this.chartSettings = {
      dimension: ['name'],
      metrics: ['value'],
      labelMap: {
        value: ''
      },
      dataOrder: {
        label: 'value',
        order: 'desc'
      }
    }
    let self = this
    this.chartEvents = {
      click: function(e) {
        self.title = e.name
        self.type = self.arrFindof(e.name)
        self.getList()
      }
    }
    return {
      chartData: {
        columns: ['name', 'value', 'type'],
        rows: []
      },
      tableVal: null,
      listVisible: false,
      title: '廉情指标分析',
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      total: null,
      type: ''
    }
  },
  created() {
    this.initChart()
  },
  methods: {
    ...mapMutations({
      toggleQuestionDialog: 'question/toggleDialog',
      setQuestionStatus: 'question/setStatus',
      setQuestionForm: 'question/setQuestionForm',
      setQuestionFormVal: 'question/setFormVal',
      toggleReportDialog: 'report/toggleDialog',
      setReportStatus: 'report/setStatus',
      setReportForm: 'question/setReportForm',
      setReportFormVal: 'report/setFormVal'
    }),
    initChart() {
      this.chartData.rows = this.data
    },
    arrFindof(val) {
      let newObj = this.chartData.rows.find(e => {
        return e.name === val
      })
      return newObj.type
    },
    getList() {
      let query = Object.assign({type: this.type}, this.listQuery)
      queryLowIndexList(query).then(res => {
        const data = res.data
        if (data.success) {
          this.total = data.allsize
          this.tableVal = data.data
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
          const type = row.archive_type_id
          switch (type) {
            case '1':
              this.setQuestionStatus('detail')
              this.setQuestionForm(row.archive_id)
              this.setQuestionFormVal(data.data)
              this.toggleQuestionDialog()
              break
            case '2':
              this.setReportStatus('detail')
              this.setReportForm(row.archive_id)
              this.setReportFormVal(data.data)
              this.toggleReportDialog()
              break
          }
        }
      })
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getList()
    }
  }
}
</script>

<style>

</style>
