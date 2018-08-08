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
          <LoopChart />
          <!-- <DisciplineRing  class="wrapper-center"/> -->
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="10">
        <div class="chart-wrapper">
          <h4 class="wrapper-tit">廉情指标分析</h4>
          <!-- <IntegrityBar :data="targetData" v-if="targetData" class="wrapper-center"/> -->
          <YBarChart :data="targetData" v-if="targetData" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="6">
        <div class="chart-wrapper">
          <h4 class="wrapper-tit">四种形态</h4>
            <LoopPieChart :data="statutsData" v-if="statutsData" class="wrapper-center"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <h4 class="wrapper-tit">违法行为</h4>
       
            <!-- <IllegalPie :data="illegalData" v-if="illegalData" class="wrapper-center"/> -->
            <!-- <PieChart name="违法行为" :data="illegalData" v-if="illegalData" /> -->
            <Highcharts :options="illegalData" v-if="illegalData" class="wrapper-center"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="10">
        <div class="chart-wrapper">
          <h4 class="wrapper-tit">单位廉情分析</h4>
     
            <!-- <IntegrityHistogram :data="unitsData" v-if="unitsData" class="wrapper-center"/> -->
              <BarChart :data="unitsData" v-if="unitsData"/>
    
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

import {getIllegalChart, getUnitChart} from '@/utils/highcharts'
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
        console.log(res.data)
        const data = res.data
        if (data.success) {
          if (data.lqzbfx.length) {
            this.targetData = data.lqzbfx
          }
          if (data.wfxw.length) {
            //this.illegalData = data.wfxw
            const wfData = []
            for(let wf of data.wfxw) {
              let arr = Object.values(wf)
              wfData.push(arr)
            }
            // console.log(wfData)
             
            // return
             const option = {name: '违法行为',data:wfData}
             this.illegalData = getIllegalChart(option)
          }
          if (data.szxt.length) {
            this.statutsData = data.szxt
          }
          if (data.dwlqfx.length) {
            // this.unitsData = data.dwlqfx
            const unitData = []
            for (let un of data.dwlqfx) {
              let arr = [un]
            }
          }
        }
      })
    }
  }
}
</script>
