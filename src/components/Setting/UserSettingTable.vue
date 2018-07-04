<template>
  <div>
    <el-table :data="tableVal" border width="100%" max-height="590" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, .1)">
      <el-table-column type="index" align="center" :index="indexMethod" label="序号" width="60">
      </el-table-column>
      <el-table-column label="姓名" prop="name" align="center"></el-table-column>
      <el-table-column label="单位" prop="unitname" align="center" min-width="130"></el-table-column>
      <el-table-column label="部门" prop="deptname" align="center" min-width="200"></el-table-column>
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
      <el-table-column label="操作" align="center" min-width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-footer">
      <el-pagination background :total="total" :current-page="listQuery.pageIndex" :page-size="listQuery.pageSize" layout="total, pager, ->, jumper" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>

</template>

<script>
import { queryTermPerson, deletePerson } from '@/api/article'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapMutations } = createNamespacedHelpers('setting')

export default {
  props: {
    id: {
      type: String
    }
  },
  created() {
    this.getPersonList()
  },
  data() {
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      total: null,
      tableVal: null,
      loading: false
    }
  },
  computed: {
    ...mapState({
      userDialogSuccess: state => state.unitDialog.success
    })
  },
  watch: {
    id() {
      this.getPersonList()
    },
    userDialogSuccess(v) {
      if (v) {
        this.getPersonList()
      }
    }
  },
  methods: {
    ...mapMutations({
      toggleDialog: 'toggleUserDialog',
      setUserDialogFormVal: 'setUserDialogFormVal',
      setUserDialogStatus: 'setUserDialogStatus',
      userDialogError: 'userDialogError'
    }),
    indexMethod(index) {
      return (
        (this.listQuery.pageIndex - 1) * this.listQuery.pageSize + index + 1
      )
    },
    getPersonList(param = { deptId: this.id }) {
      this.loading = true
      let query = Object.assign(param, this.listQuery)
      queryTermPerson(query)
        .then(res => {
          let data = res.data
          this.loading = false
          if (data.success) {
            if (data.data.length > 0) {
              this.tableVal = data.data
              this.total = data.allsize
              this.userDialogError()
            } else {
              if (this.listQuery.pageIndex > 1) {
                this.listQuery.pageIndex -= 1
                this.getPersonList()
              } else {
                this.tableVal = data.data
                this.total = data.allsize
                this.userDialogError()
              }
            }
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    getPersonInfo(row, status) {
      const organizesObj = {
        organizesOptions: [row.unit_id, row.dept_id]
      }
      const param = Object.assign(row, organizesObj)
      if (status) {
        this.setUserDialogStatus(status)
      }
      this.setUserDialogFormVal(param)
      this.toggleDialog()
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
    handleUpdate(row) {
      this.getPersonInfo(row, 'update')
    },
    handleLook(row) {
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
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getPersonList()
    }
  }
}
</script>

<style lang="scss">

</style>
