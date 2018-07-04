<template>
  <el-dialog :visible.sync="detailShow" width="60%" :before-close="closeDetail">
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
          <el-button type="text" @click="handleChange(scope.row,'detail')">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

</template>

<script>
import { queryRecordDetails, deleteRecord } from '@/api/article'
import { parseTime } from '@/filter'
import { mapState, mapMutations } from 'vuex'

export default {
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
      detailShow: state => state.portrayal.detailShow
    })
  },
  methods: {
    ...mapMutations({
      closeDetail: 'portrayal/closeDetail',
      toggleQuestionDialog: 'question/toggleDialog',
      setQuestionStatus: 'question/setStatus',
      setQuestionForm: 'question/setQuestionForm',
      setQuestionFormVal: 'question/setFormVal',
      toggleReportDialog: 'report/toggleDialog',
      setReportStatus: 'report/setStatus',
      setReportForm: 'report/setReportForm',
      setReportFormVal: 'report/setFormVal',
      toggleSuperviseDialog: 'supervise/toggleDialog',
      setSuperviseStatus: 'supervise/setStatus',
      setSuperviseForm: 'supervise/setSuperviseForm',
      setSuperviseFormVal: 'supervise/setFormVal'
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
          const type = row.archive_type_id
          switch (type) {
            case '1':
              this.setQuestionStatus('detail')
              this.setQuestionForm(row.archiveid)
              this.setQuestionFormVal(data.data)
              this.toggleQuestionDialog()
              break
            case '2':
              this.setReportStatus('detail')
              this.setReportForm(row.archiveid)
              this.setReportFormVal(data.data)
              this.toggleReportDialog()
              break
            case '2':
              this.setSuperviseStatus('detail')
              this.setSuperviseForm(row.archiveid)
              this.setSuperviseFormVal(data.data)
              this.toggleSuperviseDialog()
              break  
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
