<template>
  <el-dialog :visible.sync="detailShow" width="60%" :before-close="toggleDetail">
    <span slot="title" v-if="personInfo && personInfo.length">
      {{personInfo[0].name}}的廉政档案
    </span>
    <h4 class="detail-tit">1.基本情况</h4>
    <el-table :data="personInfo" border class="detail-table">
      <el-table-column label="身份证" align="center" prop="idcard" min-width="170"></el-table-column>
      <el-table-column label="出生日期" align="center" prop="borntime" min-width="100"></el-table-column>
      <el-table-column label="年龄" align="center" prop="age"></el-table-column>
      <el-table-column label="籍贯" align="center" prop="origin"></el-table-column>
      <el-table-column label="学历" align="center" prop="education"></el-table-column>
      <el-table-column label="政治面貌" align="center" prop="politicalstatus"></el-table-column>
      <el-table-column label="职级" align="center" prop="rank"></el-table-column>
      <el-table-column label="单位及职务" align="center" prop="position">
      </el-table-column>
    </el-table>
    <h4 class="detail-tit">2.廉政电子档案</h4>
    <el-table :data="recordList" border>
      <el-table-column label="档案名称" prop="archive_name" min-width="180"></el-table-column>
      <el-table-column label="备注" align="center" prop="remark"></el-table-column>
      <el-table-column label="建档日期" align="center" sortable min-width="140" prop="create_time" :formatter="createTimeFormatter">
        <!-- <template slot-scope="scope" v-if="scope.row.create_time">
          {{scope.row.create_time | parseTime('{y}-{m}-{d}')}}
        </template> -->
      </el-table-column>
      <el-table-column label="最后修改日期" align="center" sortable min-width="140" prop="update_time" :formatter="updateTimeFormatter">
        <!-- <template slot-scope="scope" v-if="scope.row.update_time">
          {{scope.row.update_time | parseTime('{y}-{m}-{d}')}}
        </template> -->
      </el-table-column>
      <el-table-column label="上报日期" align="center" sortable min-width="140" prop="create_time" :formatter="createTimeFormatter"></el-table-column>
      <el-table-column label="操作" align="center" min-width="140">
        <template slot-scope="scope">
          <el-button type="text" @click="handleChange(scope.row,'update')">修改</el-button>
          <el-button type="text" @click="handleChange(scope.row,'detail')">详情</el-button>
          <el-button type="text" @click="handleRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

</template>

<script>
import { queryRecordDetails, deleteRecord } from '@/api/article'
import { parseTime } from '@/filter'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  'question'
)

export default {
  name: 'QuestionDetail',
  props: {
    recordList: {
      type: Array
    },
    personInfo: {
      type: Array
    }
  },
  created() {},
  computed:{
    ...mapState({
      detailShow: 'detailShow'
    })
  },
  methods: {
    ...mapMutations({
      toggleDialog: 'toggleDialog',
      setStatus: 'setStatus',
      setQuestionForm: 'setQuestionForm',
      setFormVal: 'setFormVal',
      closeDetail: 'closeDetail',
      toggleDetail: 'toggleDetail',
      getList: 'refreshList'
    }),
    createTimeFormatter(row, column) {
      if (row.create_time) {
        return parseTime(row.create_time, '{y}-{m}-{d}')
      }
    },
    updateTimeFormatter(row, column) {
      if (row.update_time) {
        return parseTime(row.update_time, '{y}-{m}-{d}')
      }
    },
    handleChange(row,status) {
      let query = {
        archive_type_id: row.archive_type_id,
        person_id: row.person_id,
        archive_id: row.archiveid,
        buss_id: row.id
      }
      queryRecordDetails(query).then(res => {
        const data = res.data
        if(data.success) {
          this.setQuestionForm(row.archiveid)
          this.setFormVal(data.data)
          this.setStatus(status)
          this.toggleDialog()
        } else {
         
        }
      })
    },
    handleRemove(row) {
      let query = {
        id: row.id,
        archive_id: row.archiveid
      }
      this.$confirm('是否删除该档案记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRecord(query)
            .then(res => {
              let data = res.data
              console.log(data)
              if (data.success) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getList()
                this.closeDetail()
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败，请重试!'
                })
              }
            })
            .catch(err => {
              console.log(err)
              // this.$message({
              //   type: 'error',
              //   message: '删除失败，请重试!'
              // })
            })
        })
        .catch(() => {})
    }
  }
}
</script>

<style>

</style>
