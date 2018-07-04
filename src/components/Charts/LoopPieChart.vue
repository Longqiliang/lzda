<template>
  <div>
    <div :class="className" :style="{height:height,width:width}" ref="chart"></div>
    <el-dialog :visible.sync="listVisible" center :title="title" v-el-drag-dialog>
      <el-table :data="tableVal" border >
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="身份证号码" prop="id_card" align="center"></el-table-column>
        <el-table-column label="单位" prop="unit_name" align="center"></el-table-column>
        <el-table-column label="职务" prop="position" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="handleLook(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-footer">
        <el-pagination background :total="total" :current-page="listQuery.pageIndex" :page-size="listQuery.pageSize" layout="total, pager, ->, jumper" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { queryFourFormList, queryRecordDetails } from '@/api/article'
import { createNamespacedHelpers } from 'vuex'
import elDragDialog from '@/directive/el-dragDialog'

const { mapMutations } = createNamespacedHelpers('question')
export default {
  directives:{
    elDragDialog
  },
  props: {
    className: {
      type: String,
      default: 'chart-box'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    data: {
      type: Array
    },
    name: {
      type: String
    }
  },
  data() {
    return {
      chart: null,
      tableVal: null,
      listVisible: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      total: null,
      type: '',
      title: ''
    }
  },
  mounted() {
    this.initChart(this.name, this.data)
  },
  methods: {
    ...mapMutations([
      'toggleDialog',
      'setStatus',
      'setQuestionForm',
      'setFormVal'
    ]),
    getList() {
      let query = Object.assign({ type: this.type }, this.listQuery)
      queryFourFormList(query).then(res => {
        const data = res.data
        if (data.success) {
          this.total = data.allsize
          this.tableVal = data.data
          this.listVisible = true
        }
      })
    },
    arrFindof(val) {
      let newObj = this.data.find(e => {
        return e.name === val
      })
      return newObj.type
    },
    handleLook(row) {
      let query = {
        archive_type_id: row.archive_type_id,
        person_id: row.person_id,
        archive_id: row.archive_id,
        buss_id: row.bussid
      }
      // this.toggleDetail()
      console.log(query)
      queryRecordDetails(query).then(res => {
        console.log(res.data)
        let data = res.data
        if (data.success) {
          this.setStatus('detail')
          this.setQuestionForm(row.archive_id)
          this.setFormVal(data.data)
          this.toggleDialog()
        }
      })
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getList()
    },
    initChart(name, data) {
      let count = 0
      for (let i = 0; i < data.length; i += 1) {
        count += parseInt(data[i].value)
      }
      const option = {
        color: ['#00da20', '#ffdf02', '#ff860f', '#fd1a19'],
        series: []
      }
      const labelTop = {
        normal: {
          formatter: '{c}',
          textStyle: {
            fontSize: 20
          }
        }
      }
      const labelFromatter = {
        normal: {
          formatter: function(value) {
            return value.name.substring(0, 5) + '\n' + value.name.substr(5)
          },
          textStyle: {
            baseline: 'top',
            color: '#333333'
          }
        }
      }

      const labelBottom = {
        normal: {
          color: '#aaa'
        },
        emphasis: {
          color: '#aaa'
        }
      }
      const radius = ['35%', '40%']

      for (let i = 0; i < data.length; i += 1) {
        let optionY, y
        const floor = Math.floor(data.length / 2)
        if (i < floor) {
          optionY = '30%'
          y = i
        } else {
          optionY = '75%'
          y = i - floor
        }
        option.series.push({
          type: 'pie',
          hoverAnimation: false,
          center: [25 + y * 50 + '%', optionY],
          radius: radius,
          x: '0%',
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [
            {
              name: data[i].name,
              value: data[i].value,
              label: labelTop
            },
            {
              name: data[i].name,
              value: count - data[i].value,
              label: labelFromatter,
              itemStyle: labelBottom
            }
          ]
        })
      }
      this.chart = echarts.init(this.$refs.chart, null, { renderer: 'svg' })
      this.chart.setOption(option)
      let self = this
      this.chart.on('click', function(e) {
        self.title = e.name
        self.type = self.arrFindof(e.name)
        self.getList()
      })
    }
  }
}
</script>
