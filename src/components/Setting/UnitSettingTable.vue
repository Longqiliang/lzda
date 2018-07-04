<template>
  <div>
    <el-table :data="tableVal" border width="100%" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, .1)">
      <el-table-column label="序号" align="center" width="80px" prop="rowno"></el-table-column>
      <el-table-column label="机构全称" align="center" prop="unit_name"></el-table-column>
      <el-table-column label="机构编号" align="center" prop="unit_number"></el-table-column>
      <el-table-column label="机构类型" align="center" prop="unit_abbreviation"></el-table-column>
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
import { queryUnitList, deleteUnit } from '@/api/article'
import { createNamespacedHelpers, mapActions } from 'vuex'

const { mapState, mapMutations } = createNamespacedHelpers('setting')
export default {
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
    this.getUnitList()
  },
  computed: {
    ...mapState({
      unitDialogSuccess: state => state.unitDialog.success
    })
  },
  watch: {
    unitDialogSuccess(v) {
      if (v) {
        this.getUnitList()
      }
    }
  },
  methods: {
    ...mapMutations({
      toggleDialog: 'toggleUnitDialog',
      setUnitDialogFormVal: 'setUnitDialogFormVal',
      setUnitDialogStatus: 'setUnitDialogStatus',
      unitDialogError: 'unitDialogError'
    }),
    ...mapActions({
      getOrganize: 'GetOrganize'
    }),
    handleUpdate(row) {
      const unitForomVal = {
        unit_id: row.id,
        unit_name: row.unit_name,
        unit_abbreviation: row.unit_abbreviation,
        unit_number: row.unit_number
      }
      this.setUnitDialogFormVal(unitForomVal)
      this.setUnitDialogStatus('update')
      this.toggleDialog()
    },
    handleRemove(row) {
      let query = {
        unit_id: row.id
      }
      this.$confirm('是否删除该单位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.removeUnit(query)
        })
        .catch(err => {})
    },
    removeUnit(query) {
      deleteUnit(query).then(res => {
        const data = res.data
        if (data.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getOrganize()
          this.getUnitList()
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
    getUnitList() {
      this.loading = true
      queryUnitList(this.listQuery).then(res => {
        // console.log(res.data)
        this.loading = false
        const data = res.data
        if (data.success) {
          if (data.data.length > 0) {
            this.tableVal = data.data
            this.total = data.allsize
            this.unitDialogError()
          } else {
            if (this.listQuery.pageIndex > 1) {
              this.listQuery.pageIndex -= 1
              this.getUnitList()
            } else {
              this.tableVal = data.data
              this.total = data.allsize
              this.unitDialogError()
            }
          }
        }
      }).catch(err => {
        this.loading = false
      })
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getUnitList()
    }
  }
}
</script>

<style>

</style>
