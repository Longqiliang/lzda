<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="6">
        <div class="chart-wrapper">
          <h4 class="wrapper-tit">基本信息</h4>
          <Card />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <h4 class="wrapper-tit">违纪行为</h4>
          <!-- <LoopChart /> -->
          <div class="wrapper-center">
            <div class="img-box flex flex-center flex-jf-center">
              <img src="../../assets/images/chart1.png">
            </div>
          </div>
          <!-- <DisciplineRing  class="wrapper-center"/> -->
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="10">
        <div class="chart-wrapper">
          <h4 class="wrapper-tit">廉情指标分析</h4>
          <!-- <IntegrityBar :data="targetData" v-if="targetData" class="wrapper-center"/> -->
          <!-- <YBarChart :data="targetData" v-if="targetData" /> -->
          <Highcharts :options="targetData" v-if="targetData" class="wrapper-center" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="6">
        <div class="chart-wrapper">
          <h4 class="wrapper-tit">四种形态</h4>
          <LoopPieChart :data="statutsData" v-if="statutsData" class="wrapper-center" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <h4 class="wrapper-tit">违法行为</h4>

          <!-- <IllegalPie :data="illegalData" v-if="illegalData" class="wrapper-center"/> -->
          <!-- <PieChart name="违法行为" :data="illegalData" v-if="illegalData" /> -->
          <Highcharts :options="illegalData" v-if="illegalData" class="wrapper-center" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="10">
        <div class="chart-wrapper">
          <h4 class="wrapper-tit">单位廉情分析</h4>

          <!-- <IntegrityHistogram :data="unitsData" v-if="unitsData" class="wrapper-center"/> -->
          <!-- <BarChart :data="unitsData" v-if="unitsData"/> -->
          <Highcharts :options="unitsData" v-if="unitsData" class="wrapper-center" />
        </div>
      </el-col>
    </el-row>
    <QuestionDialog/>
    <ReportDialog/>
  </div>
</template>

<script>
import Card from './Card'
import DisciplineRing from './DisciplineRing'
import IntegrityHistogram from './IntegrityHistogram'
import IllegalPie from './IllegalPie'
import IntegrityBar from './IntegrityBar'
import Highcharts from './Highcharts'
import LoopPieChart from './LoopPieChart'

import PieChart from './PieChart'
import LoopChart from './LoopChart'
import BarChart from './BarChart'
import YBarChart from './YBarChart'
import { queryIndexFourInfo } from '@/api/article'
import QuestionDialog from '@/components/Dialog/QuestionDialog'
import ReportDialog from '@/components/Dialog/ReportDialog'

import { getIllegalChart, getUnitChart, getAnalysisChart } from '@/utils/highcharts'
export default {
  name: 'chart',
  components: {
    Card,
    DisciplineRing,
    IntegrityBar,
    IllegalPie,
    IntegrityHistogram,
    LoopPieChart,
    QuestionDialog,
    ReportDialog,
    Highcharts,
    PieChart,
    LoopChart,
    BarChart,
    YBarChart
  },
  data() {
    return {
      illegalData: null,
      statutsData: null,
      targetData: null,
      unitsData: null
    }
  },
  created() {
    this.getIndexInfo()
  },
  methods: {
    getIndexInfo() {
      queryIndexFourInfo().then(res => {
        const data = res.data
        if (data.success) {
          if (data.lqzbfx.length) {
            const lqData = data.lqzbfx
            this.getTargetData(lqData)
          }
          if (data.wfxw.length) {
            const wfData = data.wfxw
            this.getIllegalData(wfData)
          }
          if (data.szxt.length) {
            this.statutsData = data.szxt
          }
          if (data.dwlqfx.length) {
            const option = data.dwlqfx
            this.getUnitsDataData(option)
          }
        }
      })
    },
    getTargetData(option) {
      let tdata = [], tName = []
      for (let item of option) {
        tName.push(item.name)
        tdata.push(item.value)
      }
      const data = {
        name: tName,
        data: [{
          data: tdata,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
                [0, '#62ef00'],
                [1, '#70ad46']
            ]
          }
        }]
      }
      // this.targetData = option
      this.targetData = getAnalysisChart(data)
    },
    getUnitsDataData(option) {
      let color = ['#45c1a4', '#4bacc6', '#0e7fb7', '#b9d51f', '#ffc100']
      let unitData = [],
        unitName = [],
        zzObj = {
          name: '组织措施情况',
          data: [],
          color: color[0]
        },
        wzObj = {
          name: '受到问责情况',
          data: [],
          color: color[1]
        },
        djObj = {
          name: '受到党纪处分情况',
          data: [],
          color: color[2]
        },
        sfObj = {
          name: '移送司法情况',
          data: [],
          color: color[3]
        },
        zjObj = {
          name: '受到政务处分情况',
          data: [],
          color: color[4]
        }
      for (let un of option) {
        unitName.push((un.unit_name))
        zzObj.data.push(un.zzcount)
        wzObj.data.push(un.wzcount)
        djObj.data.push(un.djcount)
        sfObj.data.push(un.sfcount)
        zjObj.data.push(un.zjcount)
      }
      unitData.push(zzObj, wzObj, djObj, sfObj, zjObj)
      let options = {
        name: unitName,
        data: unitData
      }
      this.unitsData = getUnitChart(options)
    },
    getIllegalData(option) {
      //this.illegalData = option
      const wfData = []
      for (let wf of option) {
        let arr = Object.values(wf)
        wfData.push(arr)
      }
      const data = { name: '违法行为', data: wfData }
      this.illegalData = getIllegalChart(data)
    }
  }
}
</script>
