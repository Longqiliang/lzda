<template>
  <div class="table">
    <TableSearch/>
    <div class="table-container">
      <!-- <div class="table-tit">
        <el-button type="danger" @click="handleCreate">新增</el-button>
      </div> -->
      <el-table v-loading="loading" :data="tableVal" border width="100%">
        <el-table-column label="序号" prop="rowno" min-width="50" align="center"></el-table-column>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="单位" prop="unitname" align="center"></el-table-column>
        <el-table-column label="部门" prop="deptname" align="center"></el-table-column>
        <el-table-column label="身份证" prop="idcard" align="center" min-width="180"></el-table-column>
        <el-table-column label="年龄" prop="age" align="center"></el-table-column>
        <el-table-column label="政治面貌" prop="politicalstatus" align="center"></el-table-column>
        <el-table-column label="干部类型" prop="rank" align="center"></el-table-column>
        <el-table-column label="职务" prop="position" align="center"></el-table-column>
        <el-table-column label="任现职时间" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.worktimet">{{scope.row.worktimet}}年</template>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpdate(scope.row.id)">修改</el-button>
            <el-button type="text" @click="handleLook">详情</el-button>
            <el-button type="text" @click="handleRemove">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-footer">
        <el-pagination background :total="total" :current-page="listQuery.pageIndex" :page-size="listQuery.pageSize" layout="total, pager, ->, jumper">
        </el-pagination>
      </div>
      <UserInfoDialog @update-table="getPersonList" :DialogVisible.sync="dialogTableVisible" :status="dialogStatus" :formVal="formVal" />
    </div>
  </div>

</template>

<script>
import TableSearch from './TableSearch'
import UserInfoDialog from '@/components/Dialog/UserInfoDialog'
import { queryTermPerson, queryPerson } from '@/api/article'

export default {
  name: 'UserInfoTable',
  components: {
    TableSearch,
    UserInfoDialog
  },
  props: {
    total: {
      type: Number,
      default: 100
    }
  },
  watch: {
    $route() {
      console.log(this.$route.params.type)
    }
  },
  created() {
    this.getPersonList()
  },
  data() {
    return {
      dialogTableVisible: false,
      dialogStatus: null,
      formVal: {
        name: '',
        idCard: '',
        sex: '',
        position: '',
        rank: '',
        deptId: '',
        bornTime: '',
        education: '',
        politicalStatus: '',
        ethnic: '',
        joinWorkTime: '',
        workTime: '',
        contactNumber: '',
        cellPhone: '',
        origin: '',
        address: '',
        recordNumber: '',
        remark: '',
        unitId: '',
        deptname: ''
      },
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      loading: true,
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
        }
      })
    },
    getPersonInfo(id) {
      queryPerson(id).then(res => {
        console.log(res.data)
        let data = res.data
        if (data.success) {
          // 问题: 返回信息不是对象，对象数据没有
          // this.formVal = data.data
        }
      })
    },
    resertForm() {
      this.formVal = {
        name: '',
        idCard: '',
        sex: '',
        position: '',
        rank: '',
        deptId: '',
        bornTime: '',
        education: '',
        politicalStatus: '',
        ethnic: '',
        joinWorkTime: '',
        workTime: '',
        contactNumber: '',
        cellPhone: '',
        origin: '',
        address: '',
        recordNumber: '',
        remark: '',
        unitId: '',
        deptname: ''
      }
    },
    handleCreate() {
      this.resertForm()
      this.dialogStatus = 'create'
      this.handleClick()
    },
    handleUpdate(id) {
      this.getPersonInfo(id)
      this.dialogStatus = 'update'
      this.handleClick()
    },
    handleLook() {
      this.dialogStatus = 'detail'
      this.handleClick()
    },
    handleRemove() {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
    },
    handleClick() {
      this.dialogTableVisible = !this.dialogTableVisible
      console.log(this.formVal)
    }
  }
}
</script>

<style lang="scss">

</style>
