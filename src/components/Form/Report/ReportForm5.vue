<template>
  <el-form :model="reportForm" size="mini" label-width="80px" label-position="left" class="demo-form-inline auto">
    <el-row type="flex" justify="space-around">
      <el-col :span="11">
        <el-form-item label="姓名">
          <template v-if="!readonlyStatus">
            <el-select v-model="reportForm.person_id" filterable remote :remote-method="remoteMethod" :loading="loading">
              <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </template>
          <template v-else>
            <span>{{reportForm.personReport.name}}</span>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="工作单位">
          <template v-if="!readonlyStatus">
            <span>{{reportForm.person_id | showInfo(userList, 'unitname')}}</span>
          </template>
          <template v-else>
            <span>{{reportForm.personReport.unit_name}}</span>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="11">
        <el-form-item label="现任职务">
          <template v-if="!readonlyStatus">
            <span>{{reportForm.person_id | showInfo(userList, 'position')}}</span>
          </template>
          <template v-else>
            <span>{{reportForm.personReport.position}}</span>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="身份证号码">
          <template v-if="!readonlyStatus">
            <span class="txt-number">{{reportForm.person_id | showInfo(userList, 'idcard')}}</span>
          </template>
           <template v-else>
            <span>{{reportForm.personReport.id_card}}</span>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="11">
        <el-form-item label="户籍">
          <template v-if="!readonlyStatus">
            <span class="txt-number">{{reportForm.person_id | showInfo(userList, 'origin')}}</span>
          </template>
          <template v-else>
            <span>{{reportForm.personReport.origin}}</span>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="地址">
          <template v-if="!readonlyStatus">
            <span class="txt-number">{{reportForm.person_id | showInfo(userList, 'address')}}</span>
          </template>
          <template v-else>
            <span>{{reportForm.personReport.address}}</span>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="23">
        <span class="form-label">家庭成员情况</span>
      </el-col>
    </el-row>
    <el-row>
      <el-row>
        <el-col :span="3">
          <div class="form-table-tit">关系</div>
        </el-col>
        <el-col :span="3">
          <div class="form-table-tit">姓名</div>
        </el-col>
        <el-col :span="3">
          <div class="form-table-tit">出生年月</div>
        </el-col>
        <el-col :span="3">
          <div class="form-table-tit">文化程度</div>
        </el-col>
        <el-col :span="3">
          <div class="form-table-tit">工作单位</div>
        </el-col>
        <el-col :span="3">
          <div class="form-table-tit">家庭住址</div>
        </el-col>
        <el-col :span="3">
          <div class="form-table-tit">电话</div>
        </el-col>
        <el-col :span="3">
          <div class="form-table-tit">操作</div>
        </el-col>
      </el-row>
      <el-row class="padded-10" v-for="(fa,f) in reportForm.family" :key="f">
        <el-col :span="3">
          <el-select v-model="fa.relationship" size="mini">
            <el-option v-for="re in relation" :key="re.label" :label="re.label" :value="re.label"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input :readonly="readonlyStatus" v-model="fa.name" size="mini"></el-input>
        </el-col>
        <el-col :span="3">
          <el-date-picker :readonly="readonlyStatus"  type="date" placeholder="选择日期" v-model="fa.born_time" style="width: 100%;" value-format="yyyy-MM-dd" size="mini"></el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-select v-model="fa.education_level" size="mini">
            <el-option v-for="ed in education" :key="ed.label" :label="ed.label" :value="ed.label"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input :readonly="readonlyStatus" v-model="fa.employer" size="mini"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input :readonly="readonlyStatus" v-model="fa.address" size="mini"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input :readonly="readonlyStatus" v-model="fa.phone" size="mini"></el-input>
        </el-col>
        <el-col :span="3">
          <el-row type="flex" justify="space-around" align="center">
            <el-button :disabled="readonlyStatus" type="primary" size="mini" icon="el-icon-plus" class="mini" @click="addFamily(f)"></el-button>
            <el-button :disabled="readonlyStatus" size="mini" icon="el-icon-minus" class="mini" @click="removeFamily(f)"></el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="23">
        <div class="flex flex-jf-between flex-center">
          <span class="form-label">婚姻变化情况</span>
          <div>
            <template v-if="!readonlyStatus">
              <el-radio-group v-model="showMarriage" @change="changeMarriage">
                <el-radio :label="1">有变化</el-radio>
                <el-radio :label="0">无变化</el-radio>
              </el-radio-group>
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
    <template v-if="reportForm.marriage && reportForm.marriage.length">
      <el-row>
        <el-row>
          <el-col :span="5">
            <div class="form-table-tit">变化情况</div>
          </el-col>
          <el-col :span="7">
            <div class="form-table-tit">变化时间</div>
          </el-col>
          <el-col :span="12">
            <div class="form-table-tit">变化原因</div>
          </el-col>
        </el-row>
        <el-row class="padded-10" v-for="(mar, ma) in reportForm.marriage" :key="ma">
          <el-col :span="5">
            <el-select v-model="mar.marital_status" size="mini">
              <el-option v-for="status in maritalStatus" :key="status.label" :label="status.label" :value="status.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <el-input :readonly="readonlyStatus" v-model="mar.change_time" size="mini"></el-input>
          </el-col>
          <el-col :span="12">
            <el-input type="textarea"  :autosize="{ minRows: 1}" :readonly="readonlyStatus" v-model="mar.marital_cause" size="mini"></el-input>
          </el-col>
        </el-row>
      </el-row>
    </template>
    <el-row type="flex" justify="space-around">
      <el-col :span="23">
        <div class="flex flex-jf-between flex-center">
          <span class="form-label"> 本人持有普通护照、港澳台通行证的情况 </span>
          <div>
            <template v-if="!readonlyStatus">
            <el-radio-group v-model="showPassport" @change="changePassport">
              <el-radio :label="1">有变化</el-radio>
              <el-radio :label="0">无变化</el-radio>
            </el-radio-group>
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
    <template v-if="reportForm.passport && reportForm.passport.length">
      <el-row>
        <el-row>
          <el-col :span="7">
            <div class="form-table-tit">证件号</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">签发日期</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">有效期至</div>
          </el-col>
          <el-col :span="4">
            <div class="form-table-tit">保管机构</div>
          </el-col>
          <el-col :span="4">
            <div class="form-table-tit">备注</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">操作</div>
          </el-col>
        </el-row>
        <el-row class="padded-10" v-for="(par,pa) in reportForm.passport" :key="pa">
          <el-col :span="7">
            <el-input :readonly="readonlyStatus" v-model="par.credentials_number" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-date-picker :readonly="readonlyStatus"  type="date" placeholder="选择日期" v-model="par.sign_time" style="width: 100%;" value-format="yyyy-MM-dd" size="mini"></el-date-picker>
          </el-col>
          <el-col :span="3">
            <el-date-picker :readonly="readonlyStatus"  type="date" placeholder="选择日期" v-model="par.term_validity" style="width: 100%;" value-format="yyyy-MM-dd" size="mini"></el-date-picker>
          </el-col>
          <el-col :span="4">
            <el-input :readonly="readonlyStatus" v-model="par.custodian" size="mini"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input :readonly="readonlyStatus" v-model="par.remark" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-row type="flex" justify="space-around" align="center">
              <el-button :disabled="readonlyStatus" type="primary" size="mini" icon="el-icon-plus" class="mini" @click="addPassport(pa)"></el-button>
              <el-button :disabled="readonlyStatus" size="mini" icon="el-icon-minus" class="mini" @click="removePassport(pa)"></el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </template>
    <el-row type="flex" justify="space-around">
      <el-col :span="23">
        <div class="flex flex-jf-between flex-center">
          <span class="form-label"> 本人因私出境的情况</span>
          <div>
            <template v-if="!readonlyStatus">
            <el-radio-group v-model="showExit" @change="changeExit">
              <el-radio :label="1">有此类情况</el-radio>
              <el-radio :label="0">无此类情况</el-radio>
            </el-radio-group>
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
    <template v-if="reportForm.private_exit && reportForm.private_exit.length">
      <el-row>
        <el-row>
          <el-col :span="3">
            <div class="form-table-tit">出境日期</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">回国日期</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">所到国家</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">保管机构</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">事由</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">所用护照号</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">审批机构</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">操作</div>
          </el-col>
        </el-row>
        <el-row class="padded-10" v-for="(ex,e) in reportForm.private_exit" :key="e">
          <el-col :span="3">
            <el-date-picker :readonly="readonlyStatus"  type="date" placeholder="选择日期" v-model="ex.depart_time" style="width: 100%;" value-format="yyyy-MM-dd" size="mini"></el-date-picker>
          </el-col>
          <el-col :span="3">
            <el-date-picker :readonly="readonlyStatus"  type="date" placeholder="选择日期" v-model="ex.repatriate" style="width: 100%;" value-format="yyyy-MM-dd" size="mini"></el-date-picker>
          </el-col>
          <el-col :span="3">
            <el-input :readonly="readonlyStatus" v-model="ex.countries" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input :readonly="readonlyStatus" v-model="ex.custodian" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="ex.main_content" size="mini">
              <el-option v-for="ex in exit" :key="ex.label" :label="ex.label" :value="ex.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input :readonly="readonlyStatus" v-model="ex.passport_no" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input :readonly="readonlyStatus" v-model="ex.approve_outfit" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-row type="flex" justify="space-around" align="center">
              <el-button :disabled="readonlyStatus" type="primary" size="mini" icon="el-icon-plus" class="mini" @click="addExit(e)"></el-button>
              <el-button :disabled="readonlyStatus" size="mini" icon="el-icon-minus" class="mini" @click="removeExit(e)"></el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </template>
    <el-row type="flex" justify="space-around">
      <el-col :span="23">
        <div class="flex flex-jf-between flex-center">
          <span class="form-label">配偶、子女及其配偶被司法机关追究刑事责任的情况</span>
          <div>
            <template v-if="!readonlyStatus">
            <el-radio-group v-model="showCriminal" @change="changeCriminal">
              <el-radio :label="1">有变化</el-radio>
              <el-radio :label="0">无变化</el-radio>
            </el-radio-group>
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
    <template v-if="reportForm.criminal && reportForm.criminal.length">
      <el-row>
        <el-row>
          <el-col :span="3">
            <div class="form-table-tit">姓名</div>
          </el-col>
          <el-col :span="4">
            <div class="form-table-tit">被追究时间</div>
          </el-col>
          <el-col :span="4">
            <div class="form-table-tit">被追究原因</div>
          </el-col>
          <el-col :span="5">
            <div class="form-table-tit">处理情况</div>
          </el-col>
          <el-col :span="5">
            <div class="form-table-tit">处理结果</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">操作</div>
          </el-col>
        </el-row>
        <el-row class="padded-10" v-for="(cr,c) in reportForm.criminal" :key="c">
          <el-col :span="3">
            <el-input :readonly="readonlyStatus" v-model="cr.name" size="mini"></el-input>
          </el-col>
          <el-col :span="4">
            <el-date-picker :readonly="readonlyStatus"  type="date" placeholder="选择日期" v-model="cr.run_time" style="width: 100%;" value-format="yyyy-MM-dd" size="mini"></el-date-picker>
          </el-col>
          <el-col :span="4">
            <el-input :readonly="readonlyStatus" v-model="cr.run_cause" size="mini"></el-input>
          </el-col>
          <el-col :span="5">
            <el-select v-model="cr.dispose_stage" size="mini">
              <el-option v-for="cr in criminal" :key="cr.label" :label="cr.label" :value="cr.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-input :readonly="readonlyStatus" v-model="cr.dispose_result" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-row type="flex" justify="space-around" align="center">
              <el-button :disabled="readonlyStatus" type="primary" size="mini" icon="el-icon-plus" class="mini" @click="addCriminal(c)"></el-button>
              <el-button :disabled="readonlyStatus" size="mini" icon="el-icon-minus" class="mini" @click="removeCriminal(c)"></el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </template>
    <el-row type="flex" justify="space-around">
      <el-col :span="23">
        <div class="flex flex-jf-between flex-center">
          <span class="form-label">本人、配偶、共同生活的子女为所有权人或者共有人的房产情况</span>
          <div>
            <template v-if="!readonlyStatus">
            <el-radio-group v-model="showProperty" @change="changeProperty">
              <el-radio :label="1">有变化</el-radio>
              <el-radio :label="0">无变化</el-radio>
            </el-radio-group>
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
    <template v-if="reportForm.property && reportForm.property.length">
      <el-row>
        <el-row>
          <el-col :span="3">
            <div class="form-table-tit">产权人姓名</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">房产来源</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">具体地址</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">建筑面积</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">房产性质</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">交易时间</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">交易价格</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">操作</div>
          </el-col>
        </el-row>
        <el-row class="padded-10" v-for="(pr,p) in reportForm.property" :key="p">
          <el-col :span="3">
            <el-input :readonly="readonlyStatus" v-model="pr.name" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="pr.real_estate_source" size="mini">
              <el-option v-for="sou in houseSources" :key="sou.label" :label="sou.label" :value="sou.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input :readonly="readonlyStatus" v-model="pr.address" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input :readonly="readonlyStatus" v-model="pr.measure_area" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="pr.property_nature" size="mini">
              <el-option v-for="pro in houseProperty" :key="pro.label" :label="pro.label" :value="pro.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input :readonly="readonlyStatus" v-model="pr.trading_time" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input :readonly="readonlyStatus" v-model="pr.trading_price" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-row type="flex" justify="space-around" align="center">
              <el-button :disabled="readonlyStatus" type="primary" size="mini" icon="el-icon-plus" class="mini" @click="addProperty(p)"></el-button>
              <el-button :disabled="readonlyStatus" size="mini" icon="el-icon-minus" class="mini" @click="removeProperty(p)"></el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </template>
  </el-form>

</template>

<script>
import { uploadFile, addRecord, updateRecord, queryTermPerson } from '@/api/article'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('report')

export default {
  name: 'ReportForm5',
  props: {
    reportForm: {
      type: Object,
      default() {
        return {
          property: [
            {
              name: '',
              real_estate_source: '',
              address: '',
              measure_area: '',
              property_nature: '',
              trading_time: '',
              trading_price: ''
            }
          ],
          criminal: [
            {
              name: '',
              run_time: '',
              run_cause: '',
              dispose_stage: '',
              dispose_result: ''
            }
          ],
          marriage: [
            {
              marital_status: '',
              change_time: '',
              marital_cause: ''
            }
          ],
          passport: [
            {
              credentials_number: '',
              sign_time: '',
              term_validity: '',
              custodian: '',
              remark: ''
            }
          ],
          private_exit: [
            {
              depart_time: '',
              repatriate: '',
              countries: '',
              custodian: '',
              main_content: '',
              passport_no: '',
              approve_outfit: ''
            }
          ],
          family: [
            {
              relationship: '',
              name: '',
              born_time: '',
              employer: '',
              education_level: '',
              address: '',
              phone: ''
            }
          ]
        }
      }
    },
    user: {
      type: Array
    },
    status: {
      type: String,
      default: 'create'
    }
  },
  filters: {
    showInfo(id, user, arg) {
      if (!id) {
        return
      }
      const item = user.find(item => {
        return item.id === id
      })
      return item[arg]
    }
  },
  computed: {
    readonlyStatus() {
      if (this.status === 'detail') {
        return true
      } else {
        return false
      }
    },
  },
  mounted() {
    console.log(this.reportForm)
    console.log(this.user)
  },
  data() {
    return {
      fileUpload: '',
      archive_id: 9,
      userList:[],
      loading: false,
      showFamily: 1,
      showMarriage: 1,
      showExit: 1,
      showCriminal: 1,
      showProperty: 1,
      showPassport: 1,
      relation: [
        {
          label: '父亲'
        },
        {
          label: '母亲'
        },
        {
          label: '妻子'
        },
        {
          label: '儿子'
        },
        {
          label: '女儿'
        }
      ],
      education: [
        {
          label: '小学'
        },
        {
          label: '初中'
        },
        {
          label: '高中'
        },
        {
          label: '大学'
        }
      ],
      maritalStatus: [
        {
          label: '结婚'
        },
        {
          label: '未婚'
        },
        {
          label: '已婚'
        },
        {
          label: '离异'
        },
        {
          label: '丧偶'
        },
        {
          label: '再婚'
        }
      ],
      exit: [
        {
          label: '探亲'
        },
        {
          label: '访友'
        },
        {
          label: '学术交流'
        },
        {
          label: '就医'
        },
        {
          label: '旅游'
        },
        {
          label: '继承'
        },
        {
          label: '接受'
        },
        {
          label: '处理财产'
        }
      ],
      criminal: [
        {
          label: '立案侦查'
        },
        {
          label: '审查起诉'
        },
        {
          label: '刑事审判'
        },
        {
          label: '刑罚执行'
        },
        {
          label: '执行完毕'
        },
        {
          label: '其他'
        }
      ],
      houseSources: [
        {
          label: '购买'
        },
        {
          label: '继承'
        },
        {
          label: '接受赠与'
        },
        {
          label: '出售'
        },
        {
          label: '赠与他人'
        },
        {
          label: '其他来源'
        },
        {
          label: '其他去向'
        }
      ],
      houseProperty: [
        {
          label: '商品房'
        },
        {
          label: '福利房'
        },
        {
          label: '经济适用房'
        },
        {
          label: '限价房'
        },
        {
          label: '自建房'
        },
        {
          label: '车库'
        },
        {
          label: '车位'
        },
        {
          label: '储藏间'
        },
        {
          label: '其他'
        }
      ]
    }
  },
  methods: {
    ...mapMutations({
      closeDialog: 'toggleDialog',
      closeDetail: 'closeDetail',
      getList: 'refreshList'
    }),
    remoteMethod(query) {
      if (query !== ''  ) {
        this.loading = true
        queryTermPerson({
          pageIndex: 1,
          name: query
        }).then(res => {
          this.loading = false
          const data = res.data
          if(data.success) {
            this.userList = data.data
          }
        })
      } else {
        this.userList = []
      }
    },
    addFamily(index) {
      const familyItem = {
        relationship: '',
        name: '',
        born_time: '',
        employer: '',
        education_level: '',
        address: '',
        phone: ''
      }
      this.reportForm.family.splice(index + 1, 0, familyItem)
    },
    removeFamily(index) {
      if (this.reportForm.family.length > 1) {
        this.reportForm.family.splice(index, 1)
      }
    },
    changeMarriage(val) {
      if (val) {
        const marriageObj = {
          marital_status: '',
          change_time: '',
          marital_cause: ''
        }
        this.reportForm.marriage.push(marriageObj)
      } else {
        this.reportForm.marriage = []
      }
    },
    addExit(index) {
      const exitItem = {
        depart_time: '',
        repatriate: '',
        countries: '',
        custodian: '',
        main_content: '',
        passport_no: '',
        approve_outfit: ''
      }
      this.reportForm.private_exit.splice(index + 1, 0, exitItem)
    },
    removeExit(index) {
      if (this.reportForm.private_exit.length > 1) {
        this.reportForm.private_exit.splice(index, 1)
      }
    },
    changeExit(val) {
      if (val) {
        const exitObj = {
          depart_time: '',
          repatriate: '',
          countries: '',
          custodian: '',
          main_content: '',
          passport_no: '',
          approve_outfit: ''
        }
        this.reportForm.private_exit.push(exitObj)
      } else {
        this.reportForm.private_exit = []
      }
    },
    addCriminal(index) {
      const criminalItem = {
        name: '',
        run_time: '',
        run_cause: '',
        dispose_stage: '',
        dispose_result: ''
      }
      this.reportForm.criminal.splice(index + 1, 0, criminalItem)
    },
    removeCriminal(index) {
      if (this.reportForm.criminal.length > 1) {
        this.reportForm.criminal.splice(index, 1)
      }
    },
    changeCriminal(val) {
      if (val) {
        const criminalObj = {
          name: '',
          run_time: '',
          run_cause: '',
          dispose_stage: '',
          dispose_result: ''
        }
          this.reportForm.criminal.push(criminalObj)
      } else {
        this.reportForm.criminal = []
      }
    },
    addProperty(index) {
      const propertyItem = {
        name: '',
        real_estate_source: '',
        address: '',
        measure_area: '',
        property_nature: '',
        trading_time: '',
        trading_price: ''
      }
      this.reportForm.property.splice(index + 1, 0, propertyItem)
    },
    removeProperty(index) {
      if (this.reportForm.property.length > 1) {
        this.reportForm.property.splice(index, 1)
      }
    },
    changeProperty(val) {
      if (val) {
        const propertyObj = {
          name: '',
          real_estate_source: '',
          address: '',
          measure_area: '',
          property_nature: '',
          trading_time: '',
          trading_price: ''
        }
        this.reportForm.property.push(propertyObj)
      } else {
        this.reportForm.property = []
      }
    },
    addPassport(index) {
      const passportItem = {
        credentials_number: '',
        sign_time: '',
        term_validity: '',
        custodian: '',
        remark: ''
      }
      this.reportForm.passport.splice(index + 1, 0, passportItem)
    },
    removePassport(index) {
      if (this.reportForm.passport.length > 1) {
        this.reportForm.passport.splice(index, 1)
      }
    },
    changePassport(val) {
      if (val) {
        const passportObj = {
          credentials_number: '',
          sign_time: '',
          term_validity: '',
          custodian: '',
          remark: ''
        }
        this.reportForm.passport.push(passportObj)
      } else {
        this.reportForm.passport = []
      }
    },
    emptyObj() {
      this.reportForm.passport
    },
    createData() {
      let param = {
        archive_id: this.archive_id
      }

      let query = Object.assign(param, this.reportForm)
      query.family = JSON.stringify(query.family)
      query.marriage = JSON.stringify(query.marriage)
      query.property = JSON.stringify(query.property)
      query.private_exit = JSON.stringify(query.private_exit)
      query.criminal = JSON.stringify(query.criminal)
      query.passport = JSON.stringify(query.passport)
      console.log(query)
      // return
      addRecord(query)
        .then(res => {
          const data = res.data
          if (data.success) {
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.$emit('closeLoad')
            this.getList()
            this.closeDialog()
            this.closeDetail()
          } else {
            this.$notify({
              title: '失败',
              message: '创建失败，请重试！',
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(err => {
          this.$notify({
            title: '失败',
            message: '创建失败，请重试！',
            type: 'error',
            duration: 2000
          })
        })
    },
    updateData() {
      let param = {
        archive_id: this.archive_id
      }
      let query = Object.assign(this.reportForm, param)
      // console.log(query)
      // return
      updateRecord(query).then(res => {
        const data = res.data
        if (data.success) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
          this.closeDialog()
          this.closeDetail()
        } else {
          this.$notify({
            title: '失败',
            message: '修改失败，请重试',
            type: 'error',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
