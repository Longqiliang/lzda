<template>
  <div class="table">
    <TableSearch/>
    <div class="table-container">
      <div class="table-tit">
        <el-button type="danger" @click="handleClick">新增</el-button>
      </div>
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
        <el-pagination background :total="total" :current-page="1" :page-size="20" layout="total, pager, ->, jumper">
        </el-pagination>
      </div>
      <QuestionDialog :DialogVisible.sync="dialogTableVisible" />
    </div>
  </div>
</template>

<script>
import TableSearch from './TableSearch'
import QuestionDialog from '@/components/Dialog/QuestionDialog'
import { queryRecord } from '@/api/article'

export default {
  name: 'QuestionTable',
  components: {
    TableSearch,
    QuestionDialog
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
      archive_type_id: 1,
      listQuery: {
        limit: 10,
        index: 1
      }
    }
  },
  created() {
    let param = {
      archive_type_id: this.archive_type_id,
      pageSize: this.listQuery.limit,
      pageIndex: this.listQuery.index
    }
    this.getList(param)
  },
  computed: {},
  methods: {
    getList(query) {
      queryRecord(query).then(res => {
        console.log(res.data)
      })
    },
    handleClick() {
      this.dialogTableVisible = !this.dialogTableVisible
    }
  }
}
</script>

<style lang="scss">

</style>