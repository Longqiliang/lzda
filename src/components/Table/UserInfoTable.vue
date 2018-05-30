<template>
  <div class="table">
    <TableSearch/>
    <div class="table-container">
      {{type}}
      <div class="table-tit">
        <el-button type="danger" @click="handleCreate">新增</el-button>
      </div>
      <el-table :data="tableVal" border width="100%">
        <el-table-column label="序号" prop="rowno" align="center" width="60"></el-table-column>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="单位" prop="unitname" align="center"></el-table-column>
        <el-table-column label="部门" prop="deptname" align="center"></el-table-column>
        <el-table-column label="身份证" prop="idcard" align="center" min-width="180"></el-table-column>
        <el-table-column label="年龄" prop="age" align="center"></el-table-column>
        <el-table-column label="政治面貌" prop="politicalstatus" align="center"></el-table-column>
        <el-table-column label="职级" prop="rank" align="center"></el-table-column>
        <el-table-column label="职务" prop="position" align="center"></el-table-column>
        <el-table-column label="任现职时间" align="center">
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
import UserInfoDialog from '@/components/Dialog/UserInfoDialog'
import { queryTermPerson, queryPerson, deletePerson } from '@/api/article'

export default {
  name: 'UserInfoTable',
  components: {
    TableSearch,
    UserInfoDialog
  },
  props:{
    type: {
      type: String
    }
  },
  created() {
    const param = {
    
    }
    this.getPersonList()
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
        pageSize: 10
      },
      total: null,
      loading: false,
      tableVal: null
    }
  },
  computed: {},
  methods: {
    getPersonList(param = {}) {
      let query = Object.assign(param, this.listQuery)
      this.loading = true
      queryTermPerson(query).then(res => {
        console.log(res.data)
        this.loading = false
        let data = res.data
        if (data.success) {
          this.tableVal = data.data
          this.total = data.allsize
        }
      })
    },
    getPersonInfo(row, status) {
      this.formVal = row
      this.formVal.organizesOptions = [this.formVal.unit_id, this.formVal.dept_id]
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
        organizesOptions:[]
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
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败，请重试!'
                })
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
      console.log(this.formVal)
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getPersonList()
    }
  }
}
</script>

<style lang="scss">

</style>
