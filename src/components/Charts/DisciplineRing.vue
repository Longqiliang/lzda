<template>
  <div>
    <ve-ring :data="chartData" :events="chartEvents" :settings="chartSettings" :loading="loading" height="100%"></ve-ring>
    <el-dialog :visible.sync="listVisible" center :title="name" v-el-drag-dialog>
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
import {
  queryDisciplinaryAction,
  queryViolationList,
  queryRecordDetails
} from '@/api/article'
import elDragDialog from '@/directive/el-dragDialog'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('question')
export default {
  directives:{
    elDragDialog
  },
  data() {
    this.chartSettings = {
      radius: [95, 55],
      itemStyle: {
        normal: {
          borderColor: 'white'
        }
      },
      label: {
        normal: {
          textStyle: {
            fontWeight: 'bold',
            fontSize: 12,
            color: '#333333'
          }
        }
      },
      hoverAnimation: false
    }
    let self = this
    this.chartEvents = {
      click: function(e) {
        self.name = e.name
        self.getList()
      }
    }
    return {
      chartData: {
        columns: ['name', 'value'],
        rows: []
      },
      loading: true,
      tableVal: null,
      listVisible: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      total: null,
      name: ''
    }
  },
  created() {
    this.getAction()
  },
  methods: {
    ...mapMutations([
      'toggleDialog',
      'setStatus',
      'setQuestionForm',
      'setFormVal'
    ]),
    getList() {
      let query = Object.assign({ name: this.name }, this.listQuery)
      queryViolationList(query).then(res => {
        const data = res.data
        // console.log(data)
        if (data.success) {
          this.tableVal = data.data
          this.total = data.allsize
          this.listVisible = true
        }
      })
    },
    getAction() {
      queryDisciplinaryAction().then(res => {
        const data = res.data
        if (data.success) {
          if (data.data.length) {
            this.chartData.rows = data.data
            this.loading = false
          }
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
      // this.toggleDetail()
      console.log(query)
      queryRecordDetails(query).then(res => {
        console.log(res.data)
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
    }
  }
}
</script>

<style>

</style>
