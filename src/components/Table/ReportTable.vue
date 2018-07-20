<template>
  <div class="table">
    <TableSearch/>
    <div class="table-container">
      <div class="table-tit">
        <el-button type="danger" @click="handleCreate">新增</el-button>
      </div>
      <el-table :data="tableVal" border width="100%" @cell-click="handleDetail" height="calc(100% - 77px)" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, .8)">
        <el-table-column label="序号" fixed prop="row_num" min-width="50" align="center"></el-table-column>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="单位" prop="unit_name" align="center"></el-table-column>
        <el-table-column label="档案类型" prop="archive_type_name" align="center"></el-table-column>
        <el-table-column label="档案名称" prop="archive_name" align="center" min-width="180"></el-table-column>
        <el-table-column label="部门" prop="dept_name" align="center"></el-table-column>
        <el-table-column label="建档日期" align="center">
          <template slot-scope="scope" v-if="scope.row.create_time">
            {{scope.row.create_time | parseTime('{y}-{m}-{d}')}}
          </template>
        </el-table-column>
        <el-table-column label="最后修改日期" align="center">
          <template slot-scope="scope" v-if="scope.row.update_time">
            {{scope.row.update_time | parseTime('{y}-{m}-{d}')}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button type="text" @click="handleLook(scope.row)">详情</el-button>
            <el-button type="text" @click="handleRemove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-footer">
        <el-pagination background :total="total" :current-page="listQuery.pageIndex" :page-size="listQuery.pageSize" layout="total, pager, ->, jumper" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <ReportDetail  :recordList="recordList" :personInfo="personInfo" />
      <ReportDialog/>
    </div>
  </div>
</template>

<script>
import TableSearch from './TableSearch'
import ReportDialog from '@/components/Dialog/ReportDialog'
import {
  queryRecord,
  deleteRecord,
  updateRecord,
  queryRecordList,
  queryRecordDetails,
  queryPersonInfoDetailed,
  queryPerson
} from '@/api/article'
import ReportDetail from './ReportDetail'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapMutations } = createNamespacedHelpers('report')

export default {
  name: 'ReportTable',
  components: {
    TableSearch,
    ReportDialog,
    ReportDetail
  },
  data() {
    return {
      archive_type_id: 2,
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      total: null,
      tableVal: null,
      recordList: null,
      personInfo: [],
      loading: false
    }
  },
  created() {
    this.getList()
  },
  props: {
    unitId: {
      type: String
    },
    deptId: {
      type: String
    },
    name: {
      type: String
    }
  },
  watch: {
    isRefresh(v) {
      if (v) {
        this.getList()
      }
    },
    $route(val) {
      let matched = this.$route.matched.filter(item => item.path)
      let first = matched[0].path
      if (first === '/report') {
        this.getList()
      }
    }
  },
  computed: {
    ...mapState({
      isRefresh: 'success'
    })
  },
  methods: {
    ...mapMutations([
      'toggleDialog',
      'setStatus',
      'setReportForm',
      'setFormVal',
      'toggleDetail',
      'errorList'
    ]),
    getList(
      param = {
        unit_id: this.unitId,
        dept_id: this.deptId,
        user_name: this.name,
        archive_type_id: this.archive_type_id
      }
    ) {
      this.loading = true
      let query = Object.assign(param, this.listQuery)
      queryRecord(query)
        .then(res => {
          let data = res.data
          this.loading = false
          if (data.success) {
            //  console.log(data)
            if (data.data.length > 0) {
              this.tableVal = data.data
              this.total = data.pageInfo.totalRecord
              this.errorList()
            } else {
              if (this.listQuery.pageIndex > 1) {
                this.listQuery.pageIndex -= 1
                this.getList()
              } else {
                this.tableVal = data.data
                this.total = data.pageInfo.totalRecord
                this.errorList()
              }
            }
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    handleCreate() {
      this.setStatus('create')
      this.setFormVal({
        person_id: ''
      })
      this.toggleDialog()
    },
    handleDetail(row, column, cell, event) {
      if (column.property === 'name') {
        let query = {
          archive_type_id: row.archive_type_id,
          person_id: row.person_id,
          buss_id: row.id
        }
        const userInfo = {
          name: row.name,
          idcard: row.idcard,
          borntime: row.borntime,
          age: row.age,
          origin: row.origin,
          education: row.education,
          politicalstatus: row.politicalstatus,
          rank: row.rank,
          position: row.position
        }
        this.personInfo = [userInfo]
        queryRecordList(query)
          .then(res => {
            const data = res.data
            console.log(data)
            if (data.success) {
              this.recordList = data.data
              this.toggleDetail()
            } else {
              this.$message({
                type: 'error',
                message: '查询失败，请重试!'
              })
            }
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '查询失败，请重试!'
            })
          })
      }
    },
    handleUpdate(row) {
      let query = {
        archive_type_id: row.archive_type_id,
        person_id: row.person_id,
        archive_id: row.archiveid,
        buss_id: row.id
      }
      console.log(query)
      // return
      queryRecordDetails(query).then(res => {
        console.log(res.data)
        let data = res.data
        if (data.success) {
          this.setStatus('update')
          this.setReportForm(parseInt(row.archiveid))
          this.setFormVal(data.data)
          this.toggleDialog()
        }
      })
    },
    handleLook(row) {
      let query = {
        archive_type_id: row.archive_type_id,
        person_id: row.person_id,
        archive_id: row.archiveid,
        buss_id: row.id
      }
      console.log(query)
      if (query.archive_id === '9') {
        queryPersonInfoDetailed(query).then(res => {
          console.log(res.data)
          let data = res.data
          data.data.person_id = row.person_id
          if (data.success) {
            this.setStatus('detail')
            this.setReportForm(parseInt(row.archiveid))
            this.setFormVal(data.data)
            this.toggleDialog()
          }
        })
      } else {
        queryRecordDetails(query).then(res => {
          console.log(res.data)
          let data = res.data
          if (data.success) {
            this.setStatus('detail')
            this.setReportForm(parseInt(row.archiveid))
            this.setFormVal(data.data)
            this.toggleDialog()
          }
        })
      }
    },
    handleRemove(row) {
      let query = {
        id: row.id,
        archive_id: row.archiveid,
        archive_type_id: row.archive_type_id
      }
      this.$confirm('是否删除该档案记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRecord(query).then(res => {
            let data = res.data
            if (data.success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
            } else {
              this.$message({
                type: 'error',
                message: '删除失败，请重试!'
              })
            }
          })
        })
        .catch(() => {})
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getList()
    }
  }
}
</script>

<style lang="scss">

</style>
