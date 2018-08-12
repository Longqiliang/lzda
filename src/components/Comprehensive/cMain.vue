<template>
  <div class="table">
    <TableSearch @handleSearch="handleSearch" :isCreate="false"/>
    <div class="table-container">
      <el-table :data="tableVal" border width="100%" height="calc(100% - 42px)" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, .8)">
        <el-table-column label="序号" fixed prop="row_num" min-width="50" align="center"></el-table-column>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="单位职务" align="center" min-width="200">
          <template slot-scope="scope">
            {{scope.row.unit_name}}{{scope.row.position}}
          </template>
        </el-table-column>
        <el-table-column label="档案类型" prop="archive_type_name" align="center" min-width="120"></el-table-column>
        <el-table-column label="档案名称" prop="archive_name" align="center" min-width="120"></el-table-column>
      
        <el-table-column label="操作" align="center" min-width="120">
          <template slot-scope="scope">
            
            <el-button type="text" @click="handleLook(scope.row)">详情</el-button>
            
          </template>
        </el-table-column>
      </el-table>
      <div class="table-footer">
        <el-pagination background :total="total" :current-page="listQuery.pageIndex" :page-size="listQuery.pageSize" layout="total, pager, ->, jumper" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <QuestionDialog />
    <ReportDialog />
    <SuperviseDialog />
  </div>
</template>

<script>
import TableSearch from '@/components/Table/TableSearch'
import QuestionDialog from '@/components/Dialog/QuestionDialog'
import ReportDialog from '@/components/Dialog/ReportDialog'
import SuperviseDialog from '@/components/Dialog/SuperviseDialog'
import { mapMutations } from 'vuex'
import {
  queryAllArchives,
  queryRecordDetails
} from '@/api/article'
export default {
  components: {
    TableSearch,
    QuestionDialog,
    ReportDialog,
    SuperviseDialog
  },
  data() {
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 20
      },
      total: null,
      tableVal: null,
      loading: false
    }
  },
  props: {
    query: {
      type: Object,
      default() {
        return {
          archive_type_id: null,
          archive_id: null
        }
      }
    }
  },
  created() {
    this.getList()
  },
  watch: {
    query: {
      handler(val) {
        this.getList()
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      toggleQuestionDialog: 'question/toggleDialog',
      setQuestionStatus: 'question/setStatus',
      setQuestionForm: 'question/setQuestionForm',
      setQuestionFormVal: 'question/setFormVal',
      toggleReportDialog: 'report/toggleDialog',
      setReportStatus: 'report/setStatus',
      setReportForm: 'report/setReportForm',
      setReportFormVal: 'report/setFormVal',
      toggleSuperviseDialog: 'supervise/toggleDialog',
      setSuperviseStatus: 'supervise/setStatus',
      setSuperviseForm: 'supervise/setSuperviseForm',
      setSuperviseFormVal: 'supervise/setFormVal'
    }),
    checkRecord(type, row, data) {
      switch (type) {
        case '1':
          this.setQuestionStatus('detail')
          this.setQuestionForm(row.archiveid)
          this.setQuestionFormVal(data.data)
          this.toggleQuestionDialog()
          break
        case '2':
          this.setReportStatus('detail')
          this.setReportForm(row.archiveid)
          this.setReportFormVal(data.data)
          this.toggleReportDialog()
          break
        case '3':
          this.setSuperviseStatus('detail')
          this.setSuperviseForm(row.archiveid)
          this.setSuperviseFormVal(data.data)
          this.toggleSuperviseDialog()
          break
      }
    },
    getList(
      param = this.query) {
      this.loading = true
      let query = Object.assign(param, this.listQuery)
      queryAllArchives(query).then(res => {
          let data = res.data
          this.loading = false
          if (data.success) {
            if (data.data.length > 0) {
              this.tableVal = data.data
              this.total = data.pageInfo.totalRecord
            } else {
              if (this.listQuery.pageIndex > 1) {
                this.listQuery.pageIndex -= 1
              } else {
                this.tableVal = data.data
                this.total = data.pageInfo.totalRecord
              }
            }
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    handleLook(row) {
      let query = {
        archive_type_id: row.archive_type_id,
        person_id: row.person_id,
        archive_id: row.archiveid,
        buss_id: row.id
      }
      queryRecordDetails(query).then(res => {
        let data = res.data
        if (data.success) {
          let type = row.archive_type_id
          this.checkRecord(type, row, data)
        }
      })
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getList()
    },
    handleSearch(query) {
      // console.log(query)
      let param = Object.assign(this.query, query)
      this.getList(param)
    }
  }
}
</script>

<style>
</style>
