<template>
  <div class="table">
     <TableSearch @handleSearch="handleSearch" @handleCreate="handleCreate"/>
    <div class="table-container">
      <!-- <div class="table-tit">
        <el-button type="danger" @click="handleCreate">新增</el-button>
      </div> -->
      <el-table :data="tableVal" border width="100%" height="calc(100% - 42px)" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, .8)">
        <el-table-column type="index" align="center" :index="indexMethod" label="序号" width="60">
        </el-table-column>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="单位" prop="unitname" align="center" min-width="100"></el-table-column>
        <el-table-column label="部门" prop="deptname" align="center" min-width="180"></el-table-column>
        <el-table-column label="身份证" prop="idcard" align="center" min-width="180"></el-table-column>
        <el-table-column label="年龄" prop="age" align="center"></el-table-column>
        <el-table-column label="政治面貌" prop="politicalstatus" align="center"></el-table-column>
        <el-table-column label="职级" prop="rank" align="center"></el-table-column>
        <el-table-column label="职务" prop="position" align="center"></el-table-column>
        <el-table-column label="任现职时间" align="center" min-width="180">
          <template slot-scope="scope">
            <template v-if="scope.row.worktime">{{scope.row.worktime}}年</template>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button type="text" @click="handleLook(scope.row)">详情</el-button>
            <el-button type="text" @click="handleRemove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-footer">
        <el-pagination background :total="total" :current-page="listQuery.pageIndex" :page-size="listQuery.pageSize" layout="total, pager, ->, jumper" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <UserInfoDialog @update-table="getPersonList" :DialogVisible.sync="dialogTableVisible" :status="dialogStatus" :formVal="formVal" />

    </div>
  </div>

</template>

<script>
import TableSearch from './TableSearch'
// import UserInfoTable from './UserInfoTable'
import UserInfoDialog from '@/components/Dialog/UserInfoDialog'
import { queryTermPerson, queryPerson, deletePerson } from '@/api/article'
import { mapActions } from 'vuex'

export default {
  name: 'UserInfoMain',
  components: {
    TableSearch,
    UserInfoDialog
    // UserInfoTable
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
  created() {
    this.getPersonList()
  },  
  watch: {
    $route(val) {
      let matched = this.$route.matched.filter(item => item.path)
      let first = matched[0].path
      if (first === '/information') {
        this.getPersonList()
      }
    }
  },
    data() {
    return {
      dialogTableVisible: false,
      dialogStatus: null,
      formVal: {
        name: '',
        idcard: '',
        sex: '',
        position: '',
        rank: '',
        deptid: '',
        borntime: '',
        education: '',
        politicalstatus: '',
        ethnic: '',
        joinworktime: '',
        worktime: '',
        contactnumber: '',
        cellphone: '',
        origin: '',
        address: '',
        recordnumber: '',
        remark: '',
        unit_id: '',
        deptname: ''
      },
      listQuery: {
        pageIndex: 1,
        pageSize: 20
      },
      total: null,
      loading: false,
      tableVal: null
    }
  },
  computed: {},
  methods: {
    ...mapActions({
      getInfo: 'GetInfo'
    }),
    indexMethod(index) {
      return (
        (this.listQuery.pageIndex - 1) * this.listQuery.pageSize + index + 1
      )
    },
    getPersonList(
      param = {
        unit_id: this.unitId,
        dept_id: this.deptId,
        name: this.name
      }
    ) {
      let query = Object.assign(param, this.listQuery)      
      this.loading = true
      queryTermPerson(query)
        .then(res => {
          this.loading = false
          let data = res.data
          if (data.success) {
            this.tableVal = data.data
            this.total = data.allsize
          }
        })
        .catch(error => {
          this.loading = false
        })
    },
    getPersonInfo(row, status) {
      this.formVal = row
      this.formVal.organizesOptions = [
        this.formVal.unit_id,
        this.formVal.dept_id
      ]
      if (status) {
        this.dialogStatus = status
      }
      this.handleClick()
    },
    resertForm() {
      this.formVal = {
        name: '',
        idcard: '',
        sex: '',
        position: '',
        rank: '',
        dept_id: '1',
        borntime: '',
        education: '',
        politicalstatus: '',
        ethnic: '',
        joinworktime: '',
        worktime: '',
        contactnumber: '',
        cellphone: '',
        origin: '',
        address: '',
        recordnumber: '',
        remark: '',
        unit_id: '',
        organizesOptions: []
      }
    },
    handleCreate() {
      this.resertForm()
      this.dialogStatus = 'create'
      this.handleClick()
    },
    handleUpdate(row) {
      this.resertForm()
      this.getPersonInfo(row, 'update')
    },
    handleLook(row) {
      this.resertForm()
      this.getPersonInfo(row, 'detail')
    },
    handleRemove(id) {
      this.$confirm('是否删除该人员信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletePerson({
            personId: id
          })
            .then(res => {
              let data = res.data
              if (data.success) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getPersonList()
                this.getInfo()
              } else {
                if (data.message) {
                  this.$message({
                    type: 'error',
                    message: data.message
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: '删除失败，请重试!'
                  })
                }
              }
            })
            .catch(res => {
              this.$message({
                type: 'error',
                message: '删除失败，请重试!'
              })
            })
        })
        .catch(() => {})
    },
    handleClick() {
      this.dialogTableVisible = !this.dialogTableVisible
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getPersonList()
    },
    handleSearch(query) {
      
      this.getPersonList(query)
    }
  }
}
</script>

<style lang="scss">

</style>
