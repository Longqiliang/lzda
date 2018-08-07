<template>
  <div class="table">
    <TableSearch/>
    <div class="table-container">
      <div class="table-tit">
        <el-button type="danger" @click="handleCreate">新增</el-button>
      </div>
      <el-table :data="tableVal" border width="100%" @cell-click="handleDetail" height="calc(100% - 77px)">
        <el-table-column label="序号" fixed prop="row_num" min-width="50" align="center"></el-table-column>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="单位职务" align="center" min-width="200">
          <template slot-scope="scope">
            {{scope.row.unit_name}}{{scope.row.position}}
          </template>
        </el-table-column>
        <el-table-column label="监督信息" prop="supervisory" align="center" min-width="180" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="监督部门" prop="dept_name" align="center"></el-table-column>
        <el-table-column label="建档日期" align="center">
          <template slot-scope="scope" v-if="scope.row.create_time">
            {{scope.row.create_time | parseTime('{y}-{m}-{d}')}}
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
      <SuperviseDetail  :recordList="recordList" :personInfo="personInfo" />
      <SuperviseDialog/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TableSearch from './TableSearch'
import SuperviseDialog from '@/components/Dialog/SuperviseDialog'
import {
  queryRecord,
  deleteRecord,
  updateRecord,
  queryRecordList,
  queryRecordDetails,
  queryPerson
} from '@/api/article'
import SuperviseDetail from './SuperviseDetail'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  'supervise'
)

export default {
  name: 'SuperviseTable',
  components: {
    TableSearch,
    SuperviseDialog,
    SuperviseDetail
  },
  data() {
    return {
      archive_type_id: 3,
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      total: null,
      tableVal: null,
      recordList: null,
      personInfo: []
    }
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
    $route(val) {
      let matched = this.$route.matched.filter(item => item.path)
      let first = matched[0].path
      if (first === '/supervise') {
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  },
  provide() {
    return {
      getList: this.getList
    }
  },
  computed: {
    ...mapState({
      status: state => state.supervise.status
    })
  },
  methods: {
    ...mapMutations([
      'toggleDialog',
      'setStatus',
      'setSuperviseForm',
      'setFormVal',
      'toggleDetail'
    ]),
    getList(
      param = {
        unit_id: this.unitId,
        dept_id: this.deptId,
        user_name: this.name,
        archive_type_id: this.archive_type_id
      }
    ) {
      let query = Object.assign(param, this.listQuery)
      queryRecord(query).then(res => {
        let data = res.data
        if (data.success) {
          console.log(data)

          if (data.data.length > 0) {
            this.tableVal = data.data
            this.total = data.pageInfo.totalRecord
          } else {
            if (this.listQuery.pageIndex > 1) {
              this.listQuery.pageIndex -= 1
              this.getList()
            }
          }
        }
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
          this.setSuperviseForm(parseInt(row.archiveid))
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
      // this.toggleDetail()
      console.log(query)
      queryRecordDetails(query).then(res => {
        console.log(res.data)
        let data = res.data
        if (data.success) {
          this.setStatus('detail')
          this.setSuperviseForm(parseInt(row.archiveid))
          this.setFormVal(data.data)
          this.toggleDialog()
        }
      })
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
