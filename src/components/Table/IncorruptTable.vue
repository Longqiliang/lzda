<template>
  <div class="table">
    <TableSearch/>
    <div class="table-container">
      <el-table :data="tableVal" border width="100%">
        <el-table-column label="序号" fixed prop="id" min-width="50" align="center"></el-table-column>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="单位" prop="government" align="center"></el-table-column>
        <el-table-column label="档案类型" prop="fn" align="center"></el-table-column>
        <el-table-column label="档案名称" prop="card" align="center" min-width="180"></el-table-column>
        <el-table-column label="说明" prop="age" align="center"></el-table-column>
        <el-table-column label="建档日期" prop="politicalStatus" align="center"></el-table-column>
        <el-table-column label="最后修改日期" prop="cadres" align="center"></el-table-column>
        <el-table-column label="上报日期" prop="cadrs" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="140">
          <template slot-scope="scope">
            <el-button type="text">修改</el-button>
            <el-button type="text">详情</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-footer">
        <el-pagination background :total="total" :current-page="listQuery.pageIndex" :page-size="listQuery.pageSize" layout="total, pager, ->, jumper">
        </el-pagination>
      </div>
      <IncorruptDialog :DialogVisible.sync="dialogTableVisible" />
    </div>
  </div>
</template>

<script>
import TableSearch from './TableSearch'
import IncorruptDialog from '@/components/Dialog/IncorruptDialog'

export default {
  name: 'IncorruptTable',
  components: {
    TableSearch,
    IncorruptDialog
  },
  props: {
    total: {
      type: Number,
      default: 100
    },
    tableVal: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      total: null
    }
  },
  computed: {},
  methods: {
    handleClick() {
      this.dialogTableVisible = !this.dialogTableVisible
    }
  }
}
</script>

<style lang="scss">

</style>
