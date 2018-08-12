<template>
  <el-dialog v-el-drag-dialog :visible.sync="dialogShow" width="1000px" center :before-close="closeDialog" class="dialog">
    <template v-if="formVal">
      <div class="card">
        <h3 class="card-tit">关于{{formVal.data.aname}}同志廉情报告</h3>
        <p class="card-content">根据《纪检监察日常监督信息管理系统》查询结果，现将{{formVal.data.aname}}同志廉洁自律情况说明如下：</p>
        <h4 class="card-content-tit">一、个人基本情况</h4>
        <p class="card-content">{{formVal.data.aname}}，性别：{{sexStatus}}，民族：{{formVal.data.aethnic}}，籍贯：{{formVal.data.aorigin}}，出生年月：{{formVal.data.aborn_time}}，所属单位：{{formVal.data.unit_name}}，职务：{{formVal.data.aposition}}，职级：{{formVal.data.arank}}。</p>
        <h4 class="card-content-tit">二、问题与惩戒情况</h4>
        <p class="card-content">
          <span class="text-red">1.谈话提醒情况：</span>
          <template v-if="formVal.data.btalk_time">
            {{formVal.data.btalk_time}}，被谈话提醒
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>
        <p class="card-content">
          <span class="text-red">2.诫勉谈话情况：</span>
          <template v-if="formVal.data.ctalk_time">
            {{formVal.data.ctalk_time}}，被诫勉谈话处理
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>
        <p class="card-content">
          <span class="text-red">3.其它组织措施情况：</span>
          <template v-if="formVal.data.dtalk_time">
            {{formVal.data.dtalk_time}}，被{{formVal.data.dtalk_type}}处理
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>
        <p class="card-content">
          <span class="text-red">4.受到问责情况：</span>
          <template v-if="formVal.data.ehandle_time">
            {{formVal.data.ehandle_time}}，被{{formVal.data.unit_name}}给予{{formVal.data.eaccount_type}}处理
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>
        <p class="card-content">
          <span class="text-red">5.受到党纪处分情况：</span>
          <template v-if="formVal.data.fstart_time">
            {{formVal.data.fstart_time}}，受到{{formVal.data.fdisciplinary_type}}处分
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>
        <p class="card-content">
          <span class="text-red">6.受到政务处分情况：</span>
          <template v-if="formVal.data.gstart_time">
            {{formVal.data.gstart_time}}，受到{{formVal.data.gdisciplinary_type}}处分
          </template>
          <template v-else>
            {{errorText}}
          </template>

        </p>
        <p class="card-content">
          <span class="text-red">7.移送司法情况：</span>
          <template v-if="formVal.data.hinspection_time">
            {{formVal.data.hinspection_time}}，被移送司法机关
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>

      </div>
      <div class="card">
        <h4 class="card-content-tit">三、有关报告情况</h4>
        <p class="card-content">
          <span class="text-red">1.领导干部民主生活会发言、民主评议及民主测评情况：</span>
          <template v-if="formVal.data.ijoin_time">
            {{formVal.data.ijoin_time}}，召开{{formVal.data.unit_name}}民主生活会，民主测评情况为{{formVal.data.ilife_comment}}
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>
        <p class="card-content">
          <span class="text-red">2.领导干部任期或离任经济责任审计报告：</span>
          <template v-if="formVal.data.audit_time">
            {{formVal.data.audit_time}}，对{{formVal.data.aname}}同志自{{formVal.data.audit_time}}任职期间履行经济责任情况进行了就地审计
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>
        <p class="card-content">
          <span class="text-red">3.出国、赴台港澳备案情况：</span>
          <template v-if="formVal.abroadDmp.filing_time">
            从{{formVal.abroadDmp.filing_time}}至今共出国、赴台港澳{{formVal.abroadDmp.abroadcount}}次
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>
        <p class="card-content">
          <span class="text-red">4.婚嫁事宜报告：</span>
          <template v-if="formVal.data.lholding_time">
            {{formVal.data.lholding_time}}，在{{formVal.data.lholding_address}}举办婚嫁事宜
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>
        <p class="card-content">
          <span class="text-red">5.丧事办理报告：</span>
          <template v-if="formVal.data.mholding_time">
            {{formVal.data.mholding_time}}，在{{formVal.data.mholding_address}}举办丧事事宜
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>
        <p class="card-content">
          <span class="text-red">6.其他喜庆报告</span>
          <template v-if="formVal.data.xholding_time ">
            {{formVal.data.xholding_time}}，在{{formVal.data.xholding_address}}举办喜庆事宜
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>

        <h4 class="card-content-tit">四、日常监督情况</h4>
        <p class="card-content">
          <span class="text-red">1.巡察情况：</span>
          <template v-if="formVal.inspectionDmp.inspectioncount">
            经巡察，发现{{formVal.data.aname}}同志{{formVal.inspectionDmp.inspectioncount}}条问题线索
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>
        <p class="card-content">
          <span class="text-red">2.舆论监督情况</span>
          <template v-if="formVal.data.oexposure_time">
            {{formVal.data.oexposure_time}}，在{{oexposure_carrier}}受到曝光
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>
        <p class="card-content">
          <span class="text-red">3.会议监督情况</span>
          <template v-if="formVal.data.pmeeting_time">
            {{formVal.data.pmeeting_time}}，参加{{formVal.data.pmeeting_content}}会议，发现{{formVal.data.pmeeting_problem}}问题
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>
        <p class="card-content">
          <span class="text-red">4.监督检查情况</span>
          <template v-if="formVal.data.ysupervision_reasons">
            {{formVal.data.ysupervision_reasons}}作监督检查，发现{{formVal.data.ysupervision_reasons }}问题
          </template>
          <template v-else>
            {{errorText}}
          </template>
        </p>

        <template v-if="formVal.disciplinary || formVal.government">
          <h4 class="card-content-tit">五、参考建议</h4>
          <p class="text-indent card-content">
            <template v-if="formVal.disciplinary">
              鉴于{{formVal.data.aname}}同志于{{formVal.fstart_time}}受到{{formVal.fdisciplinary_type}}处分，{{formVal.disciplinaryShow}}，依据相关规定：{{formVal.disciplinary}}
            </template>
          </p>
          <p class="text-indent card-content">
            <template v-if="formVal.government">
              鉴于{{formVal.data.aname}}同志于{{formVal.gstart_time}}受到{{formVal.gdisciplinary_type}}处分，{{formVal.governmentShow}}，依据相关规定：{{formVal.government}}
            </template>
          </p>
        </template>

        <!-- <p class="padded-40 text-right card-content">2018年5月31日</p> -->
      </div>
    </template>

  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-dragDialog'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapMutations } = createNamespacedHelpers('incorrupt')
export default {
  directives: {
    elDragDialog
  },
  data() {
    return {
      errorText: '没有相关记录。'
    }
  },
  computed: {
    ...mapState({
      dialogShow: 'dialogShow',
      formVal: 'formVal'
    }),
    sexStatus() {
      if (this.formVal.data.asex === '1') {
        return '男'
      } else {
        return '女'
      }
    }
  },
  methods: {
    ...mapMutations({
      closeDialog: 'toggleDialog'
    })
  }
}
</script>

<style>

</style>
