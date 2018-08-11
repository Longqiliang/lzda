<template>
  <div class="table">
    <TableSearch @handleSearch="handleSearch" @handleCreate="handleCreate" :archiveOptions="archiveOptions"/>
    <div class="table-container">
      <!-- <div class="table-tit">
        <el-button type="danger" @click="handleCreate">新增</el-button>
      </div> -->
      <el-table :data="tableVal" border width="100%" @cell-click="handleDetail" height="calc(100% - 42px)" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, .8)">
        <el-table-column label="序号" fixed prop="row_num" min-width="50" align="center"></el-table-column>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="单位职务" align="center" min-width="200">
          <template slot-scope="scope">
            {{scope.row.unit_name}}{{scope.row.position}}
          </template>
        </el-table-column>
        
        <el-table-column label="档案名称" prop="archive_name" align="center" min-width="120"></el-table-column>
        <el-table-column label="录入部门" prop="" align="center" min-width="140"></el-table-column>
        <el-table-column label="建档日期" align="center" min-width="140">
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
      <QuestionDetail :recordList="recordList" :personInfo="personInfo" />
      <QuestionDialog/>
    </div>
  </div>
</template>

<script>
import TableSearch from './TableSearch'
import QuestionDialog from '@/components/Dialog/QuestionDialog'
import {
  queryRecord,
  deleteRecord,
  updateRecord,
  queryRecordList,
  queryRecordDetails,
  queryPerson,
  queryArchivesAll
} from '@/api/article'
import QuestionDetail from './QuestionDetail'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapMutations } = createNamespacedHelpers('question')

export default {
  name: 'QuestionTable',
  components: {
    TableSearch,
    QuestionDialog,
    QuestionDetail
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
  data() {
    return {
      archive_type_id: 1,
      listQuery: {
        pageIndex: 1,
        pageSize: 20
      },
      total: null,
      tableVal: null,
      recordList: null,
      personInfo: [],
      loading: false,
      archiveOptions: [],
      archive_id: null
    }
  },
  created() {
    this.getList()
    this.getArchive()
  },
  computed: {
    ...mapState({
      isRefresh: 'success'
    })
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
      if (first === '/question') {
        this.getList()
      }
    }
  },
  methods: {
    ...mapMutations({
      initDialog: 'initDialog',
      toggleDialog: 'toggleDialog',
      setStatus: 'setStatus',
      setQuestionForm: 'setQuestionForm',
      setFormVal: 'setFormVal',
      toggleDetail: 'toggleDetail',
      errorList: 'errorList'
    }),
    getList(
      param = {
        unit_id: this.unitId,
        dept_id: this.deptId,
        user_name: this.name,
        archive_type_id: this.archive_type_id,
        archive_id: this.archive_id
      }
      ) {
      this.loading = true
      let query = Object.assign(param, this.listQuery)
      queryRecord(query)
        .then(res => {
          let data = res.data
          this.loading = false
          if (data.success) {
            console.log(data)

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
    getArchive() {
      const param = {
        archive_type_id: this.archive_type_id
      }
      queryArchivesAll(param).then(res => {
        const data = res.data
        if(data.success){
          this.archiveOptions = data.data
        }
      })
    }, // 获取档案名称
    handleCreate() {
      this.setStatus('create')
      this.initDialog()
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
        // console.log(userInfo)
        this.personInfo = [userInfo]
        queryRecordList(query)
          .then(res => {
            const data = res.data
            // console.log(data, 'detail')
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
      queryRecordDetails(query).then(res => {
        let data = res.data
        if (data.success) {
          this.setStatus('update')
          this.setQuestionForm(row.archiveid)
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
          this.setQuestionForm(row.archiveid)
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
    },
    handleSearch(query) {
      query.archive_type_id = this.archive_type_id
      this.archive_id = query.archive_id
      this.getList(query)
    }
  }
}
</script>

<style lang="scss">

</style>
