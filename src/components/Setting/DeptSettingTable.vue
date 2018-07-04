<template>
  <div>
    <el-table :data="tableVal" border width="100%" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, .1)">
      <el-table-column label="序号" align="center" width="80px" prop="rowno"></el-table-column>
      <el-table-column label="部门名称" align="center" prop="dept_name"></el-table-column>
      <el-table-column label="单位名称" align="center" prop="unit_name"></el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
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
import { queryDeptList, updateDept, deleteDept } from '@/api/article'
import { createNamespacedHelpers, mapActions } from 'vuex'

const { mapMutations } = createNamespacedHelpers('setting')
export default {
  props: {
    id: {}
  },
  watch: {
    id() {
      this.getDeptList()
    }
  },
  data() {
    return {
      tableVal: null,
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      total: null,
      loading: false
    }
  },
  created() {
    this.getDeptList()
  },
  methods: {
    ...mapMutations({
      toggleDialog: 'toggleDeptDialog',
      setDeptDialogFormVal: 'setDeptDialogFormVal',
      setDeptDialogStatus: 'setDeptDialogStatus',
      deptDialogError: 'deptDialogError'
    }),
    ...mapActions({
      getOrganize: 'GetOrganize'
    }),
    handleUpdate(row) {
      const deptForomVal = {
        dept_name: row.dept_name,
        unit_id: row.unit_id,
        dept_id: row.id
      }
      this.setDeptDialogFormVal(deptForomVal)
      this.setDeptDialogStatus('update')
      this.toggleDialog()
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getDeptList()
    },
    handleRemove(row) {
      let query = {
        dept_id: row.id,
        unit_id: row.unit_id
      }
      this.$confirm('是否删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.removeDepartment(query)
        })
        .catch(err => {})
    },
    removeDepartment(query) {
      deleteDept(query).then(res => {
        const data = res.data
        if (data.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getDeptList()
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
    },
    getDeptList(param = { unit_id: this.id }) {
      this.loading = true
      const query = Object.assign(param, this.listQuery)
      queryDeptList(query)
        .then(res => {
          const data = res.data
          this.loading = false
          if (data.success) {
            if (data.data.length > 0) {
              this.tableVal = data.data
              this.total = data.allsize
              this.deptDialogError()
            } else {
              if (this.listQuery.pageIndex > 1) {
                this.listQuery.pageIndex -= 1
                this.getDeptList()
              } else {
                this.tableVal = data.data
                this.total = data.allsize
                this.deptDialogError()
              }
            }
          }
        })
        .catch(err => {
          this.loading = false
        })
    }
  }
}
</script>

<style>

</style>
