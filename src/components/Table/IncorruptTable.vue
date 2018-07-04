<template>
  <div class="table">
    <TableSearch/>
    <div class="table-container">
      <el-table :data="tableVal" border width="100%" height="calc(100% - 42px)">
        <el-table-column label="序号" prop="row_num" min-width="50" align="center"></el-table-column>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="单位" prop="unitname" align="center"></el-table-column>
        <el-table-column label="档案号" prop="recordnumber" align="center"></el-table-column>
        <el-table-column label="身份证" prop="idcard" align="center" min-width="180"></el-table-column>
        <el-table-column label="年龄" prop="age" align="center"></el-table-column>
        <el-table-column label="政治面貌" prop="politicalstatus" align="center"></el-table-column>
        <el-table-column label="职级" prop="rank" align="center"></el-table-column>
        <el-table-column label="职务" prop="position" align="center"></el-table-column>
        <el-table-column label="任现职时间" prop="worktimet" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="handleLook(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-footer">
        <el-pagination background :total="total" :current-page="listQuery.pageIndex" :page-size="listQuery.pageSize" layout="total, pager, ->, jumper" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <IncorruptDialog />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TableSearch from './TableSearch'
import IncorruptDialog from '@/components/Dialog/IncorruptDialog'
import { queryHonest, queryProbityReport } from '@/api/article'
import { createNamespacedHelpers, mapGetters } from 'vuex'

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  'incorrupt'
)

export default {
  name: 'IncorruptTable',
  components: {
    TableSearch,
    IncorruptDialog
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
      if (first === '/incorrupt') {
        this.getList()
      }
    }
  },
  data() {
    return {
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
  created() {
    this.getList()
  },
  provide() {
    return {
      getList: this.getList
    }
  },
  computed: {},
  methods: {
    ...mapMutations(['toggleDialog', 'setFormVal']),
    getList(
      param = {
        unit_id: this.unitId,
        dept_id: this.deptId,
        name: this.name
      }
    ) {
      let query = Object.assign(param, this.listQuery)
      queryHonest(query).then(res => {
        let data = res.data
        if (data.success) {
          // console.log(data)

          if (data.data.length > 0) {
            this.tableVal = data.data
            this.total = data.allsize
          } else {
            if (this.listQuery.pageIndex > 1) {
              this.listQuery.pageIndex -= 1
              this.getList()
            } else {
              this.tableVal = data.data
              this.total = data.allsize
            }
          }
        }
      })
    },
    handleLook(row) {
      let query = {
        person_id: row.id
      }
      queryProbityReport(query).then(res => {
        const data = res.data
        console.log(data)
        if (data.success) {
          this.setFormVal(data)
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

<style lang="scss">

</style>
