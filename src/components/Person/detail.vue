<template>
  <div class="detail-protrayal">
    <div class="detail-tit">
      <div class="detail-tit-item">
        领导姓名：
        <span>{{name}}</span>
      </div>
      <div class="detail-tit-item">
        性别：
        <span>{{sexStatus}}</span>
      </div>
      <div class="detail-tit-item">
        职级：
        <span>{{rank}}</span>
      </div>
      <div class="detail-tit-item">
        政治面貌：
        <span>{{politicalstatus}}</span>
      </div>
      <div class="detail-tit-item">
        工作单位：
        <span>{{unitname}}</span>
      </div>

    </div>
    <template v-if="this.counts">
      <div class="detail-content is-vertical">
        <div class="detail-main">
          <div class="detail-aside left">
            <div class="detail-item" @click="fetchDetail(1,1,counts.problemcount,counts.problemcount)">
              <div class="detail-item-tit flex-end">
                问题线索情况({{counts.problemcount}})
              </div>
              <div class="detail-img-box" :class=" this.counts.problemcount ? 'active' : ''">
                <i class="iconfont icon-wtxs"></i>
              </div>
            </div>
            <div class="detail-item" @click="fetchDetail(1,5,counts.lettercount)">
              <div class="detail-item-tit flex-end">
                信访举报调查处理情况({{counts.lettercount}})
              </div>
              <div class="detail-img-box" :class=" this.counts.lettercount ? 'active' : ''">
                <i class="iconfont icon-xfjb"></i>
              </div>
            </div>
            <div class="detail-item" @click="fetchDetail(1,6,counts.interviewscount)">
              <div class="detail-item-tit flex-end">
                谈话函询情况({{counts.interviewscount}})
              </div>
              <div class="detail-img-box" :class=" this.counts.interviewscount ? 'active' : ''">
                <i class="iconfont icon-thhx"></i>
              </div>
            </div>
            <div class="detail-item" @click="fetchDetail(1,3,counts.incorruptiblecount)">
              <div class="detail-item-tit flex-end">
                廉政谈话情况({{counts.incorruptiblecount}})
              </div>
              <div class="detail-img-box" :class=" this.counts.incorruptiblecount ? 'active' : ''">
                <i class="iconfont icon-lzth"></i>
              </div>
            </div>
            <div class="detail-item" @click="fetchDetail(1,19,counts.remindcount)">
              <div class="detail-item-tit flex-end">
                谈话提醒情况({{counts.remindcount}})
              </div>
              <div class="detail-img-box" :class=" this.counts.remindcount ? 'active' : ''">
                <i class="iconfont icon-thtx"></i>
              </div>
            </div>
            <div class="detail-item" @click="fetchDetail(1,20,counts.persuadecount)">
              <div class="detail-item-tit flex-end">
                诫勉谈话情况({{counts.persuadecount}})
              </div>
              <div class="detail-img-box" :class=" this.counts.persuadecount ? 'active' : ''">
                <i class="iconfont icon-lzth"></i>
              </div>
            </div>
            <div class="detail-item" @click="fetchDetail(1,21,counts.othercount)">
              <div class="detail-item-tit flex-end">
                受到其它组织措施情况({{counts.othercount}})
              </div>
              <div class="detail-img-box" :class=" this.counts.othercount ? 'active' : ''">
                <i class="iconfont icon-qtzz"></i>
              </div>
            </div>
            <div class="detail-item" @click="fetchDetail(1,4,counts.accountabilitycount)">
              <div class="detail-item-tit flex-end">
                受到问责情况({{counts.accountabilitycount}})
              </div>
              <div class="detail-img-box" :class=" this.counts.accountabilitycount ? 'active' : ''">
                <i class="iconfont icon-question"></i>
              </div>
            </div>
          </div>
          <div class="detail-center">
            <div class="detail-center-top">
              <div class="detail-item is-vertical jf-center" @click="fetchDetail(1,7,counts.partycount)">
                <div class="detail-item-tit text-center">
                  受到党纪处分情况({{counts.partycount}})
                </div>
                <div class="detail-img-box" :class=" this.counts.partycount ? 'active' : ''">
                  <i class="iconfont icon-party"></i>
                </div>

              </div>
              <div class="detail-item is-vertical jf-center" @click="fetchDetail(1,18,counts.justicecount)">
                <div class="detail-item-tit text-center">
                  移送司法({{counts.justicecount}})
                </div>
                <div class="detail-img-box" :class=" this.counts.justicecount ? 'active' : ''">
                  <i class="iconfont icon-yssf"></i>
                </div>

              </div>
              <div class="detail-item is-vertical jf-center" @click="fetchDetail(1,22,counts.governmentcount)">
                <div class="detail-item-tit text-center">
                  受到政务处分情况({{counts.governmentcount}})
                </div>
                <div class="detail-img-box" :class=" this.counts.governmentcount ? 'active' : ''">
                  <i class="icon-zwcf"></i>
                </div>

              </div>
            </div>
            <div class="detail-bg">
              <template v-if="sex === '1'">
                <img src="../../assets/images/man.png">
              </template>
              <template v-else-if="sex === '2'">
                <img src="../../assets/images/women.png">
              </template>
            </div>
            <div class="detail-center-bottom">
              <div class="detail-item is-vertical jf-center" @click="fetchDetail(2,8,counts.economiccount)">
                <div class="detail-img-box" :class=" this.counts.economiccount ? 'active' : ''">
                  <i class="iconfont icon-sjbg"></i>
                </div>
                <div class="detail-item-tit">
                  领导干部任期或离任经济责任审计报告({{counts.economiccount}})
                </div>
              </div>
              <div class="detail-item is-vertical jf-center" @click="fetchDetail(2,10,counts.lifecount)">
                <div class="detail-img-box" :class=" this.counts.lifecount ? 'active' : ''">
                  <i class="iconfont icon-mzcp"></i>
                </div>
                <div class="detail-item-tit">
                  领导干部民主生活会发言材料、民主评议及民主测评情况({{counts.lifecount}})
                </div>
              </div>
              <div class="detail-item is-vertical jf-center" @click="fetchDetail(3,15,counts.inspectioncount)">
                <div class="detail-img-box" :class=" this.counts.inspectioncount ? 'active' : ''">
                  <i class="iconfont icon-zgqk"></i>
                </div>
                <div class="detail-item-tit">
                  巡察情况及巡察问题整改情况({{counts.inspectioncount}})
                </div>
              </div>
            </div>
          </div>

          <div class="detail-aside right">
            <div class="detail-item" @click="fetchDetail(1,2,counts.partcount)">
              <div class="detail-img-box" :class=" this.counts.partcount ? 'active' : ''">
                <i class="iconfont icon-yjhf"></i>
              </div>
              <div class="detail-item-tit">
                党风廉政意见回复情况({{counts.partcount}})
              </div>
            </div>
            <div class="detail-item" @click="fetchDetail(2,11,counts.responsecount)">
              <div class="detail-img-box" :class=" this.counts.responsecount ? 'active' : ''">
                <i class="iconfont icon-szsl"></i>
              </div>
              <div class="detail-item-tit">
                领导干部述责述廉报告({{counts.responsecount}})
              </div>
            </div>
            <div class="detail-item" @click="fetchDetail(2,14,counts.abroadcount)">
              <div class="detail-img-box" :class=" this.counts.abroadcount ? 'active' : ''">
                <i class="iconfont icon-cgba"></i>
              </div>
              <div class="detail-item-tit">
                出国、赴台港澳备案情况({{counts.abroadcount}})
              </div>
            </div>
            <div class="detail-item" @click="fetchDetail(2,9,counts.reportcount)">
              <div class="detail-img-box" :class=" this.counts.reportcount ? 'active' : ''">
                <i class="iconfont icon-contact"></i>
              </div>
              <div class="detail-item-tit">
                个人事项报告({{counts.reportcount}})
              </div>
            </div>
            <div class="detail-item" @click="fetchDetail(2,12,counts.matterscount)">
              <div class="detail-img-box" :class=" this.counts.matterscount ? 'active' : ''">
                <i class="icon-marriage"></i>
              </div>
              <div class="detail-item-tit">
                婚嫁事宜报告表({{counts.matterscount}})
              </div>
            </div>
            <div class="detail-item" @click="fetchDetail(2,13,counts.funeralcount)">
              <div class="detail-img-box" :class=" this.counts.funeralcount ? 'active' : ''">
                <i class="icon-ssbg"></i>
              </div>
              <div class="detail-item-tit">
                丧事办理报告表({{counts.funeralcount}})
              </div>
            </div>
            <div class="detail-item" @click="fetchDetail(3,16,counts.opinioncount)">
              <div class="detail-img-box" :class=" this.counts.opinioncount ? 'active' : ''">
                <i class="iconfont icon-net"></i>
              </div>
              <div class="detail-item-tit">
                舆论监督情况({{counts.opinioncount}})
              </div>
            </div>
            <div class="detail-item" @click="fetchDetail(3,17,counts.meetingcount)">
              <div class="detail-img-box" :class=" this.counts.meetingcount ? 'active' : ''">
                <i class="iconfont icon-hyjd"></i>
              </div>
              <div class="detail-item-tit">
                会议监督情况({{counts.meetingcount}})
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="detail-footer ">
          <div class="detail-item po-bottom is-vertical jf-center ">
            <div class="detail-img-box " :class=" this.counts.criminalcount ? 'active' : ''">
              <i class="iconfont icon-userInfo"></i>
            </div>
            <div class="detail-item-tit">
              配偶、子女及其配偶被司法机关追究刑事责任的情况({{counts.criminalcount}})
            </div>
          </div>
        </div> -->
      </div>
    </template>
    <TableDetail :recordList="recordList" :personInfo="personInfo" />
    <QuestionDialog/>
    <ReportDialog/>
    <SuperviseDialog/>
  </div>

</template>

<script>
import { queryFigurePortraitCount, queryFigureReportsList } from '@/api/article'
import { mapGetters, mapMutations } from 'vuex'
import TableDetail from '@/components/Person/TableDetail'
import QuestionDialog from '@/components/Dialog/QuestionDialog'
import ReportDialog from '@/components/Dialog/ReportDialog'
import SuperviseDialog from '@/components/Dialog/SuperviseDialog'
export default {
  name: 'personDetail',
  components: {
    QuestionDialog,
    ReportDialog,
    SuperviseDialog,
    TableDetail
  },
  props: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    sex: {
      type: String
    },
    rank: {
      type: String
    },
    politicalstatus: {
      type: String
    },
    unitname: {
      type: String
    },
    idcard: {
      type: String
    },
    borntime: {
      type: String
    },
    education: {
      type: String
    },
    position: {
       type: String
    }
  },
  data() {
    return {
      counts: null,
      recordList: null,
      listQuery: {
        pageIndex: 1,
        pageSize: null
      }
    }
  },
  created() {
    this.fetchCounts()
  },
  watch: {
    id: 'fetchCounts'
    
  },
  computed: {
    ...mapGetters({
      getInfoById: state => state.app.getInfoById
    }),
    sexStatus() {
      if (this.sex === '1') {
        return '男'
      } else if (this.sex === '2') {
        return '女'
      }
    },
    personInfo() {
      const userInfo = {
        name: this.name,
        idcard: this.idcard,
        borntime: this.borntime,
        age: this.age,
        origin: this.origin,
        education: this.education,
        politicalstatus: this.politicalstatus,
        rank: this.rank,
        position: this.position
      }
      return [userInfo]
    }
  },
  methods: {
    ...mapMutations({
      toggleDetail: 'portrayal/toggleDetail'
    }),
    fetchCounts(v) {
      this.post = null
      // const users = this.$store.getters.getInfoById(this.id)
      // if (users.length) {
      //   this.personInfo = users[0]
      // }
      queryFigurePortraitCount({
        id: this.id
      }).then(res => {
        const data = res.data
        if (data.success) {
          this.counts = data.data
        }
      })
    },
    fetchDetail(typeId = null, archiveId = null, count) {
      if (!count) {
        return
      }
      const param = {
        archive_type_id: typeId,
        archive_id: archiveId,
        person_id: this.id
      }
      const query = Object.assign(param, this.listQuery)
      queryFigureReportsList(query).then(res => {
        const data = res.data
        if (data.success) {
          this.recordList = data.data
          this.toggleDetail()
        } else {
          this.$message({
            type: 'error',
            message: '查询失败，请重试!'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/_variables.scss';
.detail-protrayal {
  font-size: 18px;
  color: $black;
}
.detail-tit {
  padding: 15px 0;
  margin: 0 12px 30px;
  border: 1px solid $view-color;
  display: flex;
  flex-wrap: wrap;
  &-item {
    padding: 0 20px;
  }
}
.is-vertical {
  flex-direction: column;
}
.jf-center {
  justify-content: center;
  align-items: center;
}
.detail-content {
  display: flex;
  .flex-end {
    justify-content: flex-end;
  }
  .text-right {
    text-align: right;
  }
  .detail-main {
    display: flex;
    margin-top: 48px;
    .detail-aside {
      flex: 1;
      position: relative;
      .detail-item {
        &:not(:last-child) {
          margin-bottom: 7px;
        }
        &-tit {
          align-items: center;
        }
      }
      &.left {
        margin-right: -13px;
      }
      &.right {
        margin-left: -13px;
      }
    }
    .detail-center {
      &-top {
        margin-bottom: -6px;
        margin-top: -48px;
      }
      &-bottom {
        margin-top: -6px;
      }
      &-top,
      &-bottom {
        width: 473px;
        display: flex;
        padding: 0 13px;
        > .detail-item {
          flex: 1;
        }
      }
    }
    .detail-bg {
      background-image: url(../../assets/images/person-detail.png);
      width: 473px;
      height: 360px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        display: block;
        width: 220px;
        height: 220px;
      }
    }
  }
  .detail-item {
    display: flex;
    cursor: pointer;
    &-tit {
      flex: 1;
      display: flex;
      padding: 0 15px;
    }
    .detail-img-box {
      border-radius: 50%;
      border: 1px solid $view-color;
      width: 50px;
      height: 50px;
      background-color: #adb5b2;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      .icon-zwcf {
        background-image: url(../../assets/images/icon-illegal.png);
        background-repeat: no-repeat;
        background-size: contain;
        width: 28px;
        height: 28px;
      }
      .icon-marriage {
        background-image: url(../../assets/images/icon-marriage.png);
        background-repeat: no-repeat;
        background-size: contain;
        width: 28px;
        height: 28px;
      }
      .icon-ssbg {
        background-image: url(../../assets/images/icon-ssbg.png);
        background-repeat: no-repeat;
        background-size: contain;
        width: 28px;
        height: 28px;
      }
      i {
        font-size: 36px;
      }
      &.active {
        background-color: #eb6776;
      }
    }
  }
}
</style>

