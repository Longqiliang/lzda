<template>
  <el-form :model="reportForm" size="mini" label-width="80px" label-position="left" class="demo-form-inline auto">
    <el-row type="flex" justify="space-around">
      <el-col :span="11">
        <el-form-item label="姓名">
          <el-input v-model="reportForm.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="工作单位">
          <el-input v-model="reportForm.id_card"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="11">
        <el-form-item label="现任职务">
          <el-input v-model="reportForm.unit_name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="身份证号码">
          <el-input v-model="reportForm.position"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="23">
        <el-form-item label="户籍地址">
          <el-input v-model="reportForm.insp_problem"></el-input>
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
        <el-col :span="4">
          <div class="form-table-tit">工作单位</div>
        </el-col>
        <el-col :span="5">
          <div class="form-table-tit">家庭住址及电话</div>
        </el-col>
        <el-col :span="3">
          <div class="form-table-tit">操作</div>
        </el-col>
      </el-row>
      <el-row class="padded-10">
        <el-col :span="3">
          <el-select v-model="reportForm.id" size="mini">
            <el-option v-for="re in relation" :key="re.label" :label="re.label" :value="re.label"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input v-model="reportForm.name" size="mini"></el-input>
        </el-col>
        <el-col :span="3">
          <el-select v-model="reportForm.id" size="mini">
            <el-option v-for="ed in education" :key="ed.label" :label="ed.label" :value="ed.label"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="reportForm.id" size="mini">
            <el-option v-for="ed in education" :key="ed.label" :label="ed.label" :value="ed.label"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="reportForm.name" size="mini"></el-input>
        </el-col>
        <el-col :span="5">
          <el-input v-model="reportForm.name" size="mini"></el-input>
        </el-col>
        <el-col :span="3">
          <el-row type="flex" justify="space-around" align="center">
            <el-button type="primary" size="mini" icon="el-icon-plus" class="mini"></el-button>
            <el-button size="mini" icon="el-icon-minus" class="mini"></el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="23">
        <div class="flex flex-jf-between flex-center">
          <span class="form-label">婚姻变化情况</span>
          <div>
            <el-radio label="1">无变化</el-radio>
            <el-radio label="2">有变化</el-radio>
          </div>
        </div>
      </el-col>
    </el-row>
    <template v-show="t">
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
        <el-row class="padded-10">
          <el-col :span="5">
            <el-select v-model="reportForm.id" size="mini">
              <el-option v-for="mar in maritalStatus" :key="mar.label" :label="mar.label" :value="mar.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="12">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
        </el-row>
      </el-row>
    </template>
    <el-row type="flex" justify="space-around">
      <el-col :span="23">
        <div class="flex flex-jf-between flex-center">
          <span class="form-label"> 本人持有普通护照、港澳台通行证的情况 </span>
          <div>
            <el-radio label="1">无变化</el-radio>
            <el-radio label="2">有变化</el-radio>
          </div>
        </div>
      </el-col>
    </el-row>
    <template v-show="t">
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
        <el-row class="padded-10">
          <el-col :span="7">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="reportForm.id" size="mini">
              <el-option v-for="ta in talkType" :key="ta.label" :label="ta.label" :value="ta.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="reportForm.id" size="mini">
              <el-option v-for="ta in talkType" :key="ta.label" :label="ta.label" :value="ta.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-row type="flex" justify="space-around" align="center">
              <el-button type="primary" size="mini" icon="el-icon-plus" class="mini"></el-button>
              <el-button size="mini" icon="el-icon-minus" class="mini"></el-button>
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
            <el-radio label="1">有此类情况</el-radio>
            <el-radio label="2">无此类情况</el-radio>
          </div>
        </div>
      </el-col>
    </el-row>
    <template v-show="t">
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
            <div class="form-table-tit">事由</div>
          </el-col>
          <el-col :span="5">
            <div class="form-table-tit">所用护照号</div>
          </el-col>
          <el-col :span="4">
            <div class="form-table-tit">审批机构</div>
          </el-col>
          <el-col :span="3">
            <div class="form-table-tit">操作</div>
          </el-col>
        </el-row>
        <el-row class="padded-10">
          <el-col :span="3">
            <el-select v-model="reportForm.id" size="mini">
              <el-option v-for="ta in talkType" :key="ta.label" :label="ta.label" :value="ta.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="reportForm.id" size="mini">
              <el-option v-for="ta in talkType" :key="ta.label" :label="ta.label" :value="ta.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="reportForm.id" size="mini">
              <el-option v-for="cr in criminal" :key="cr.label" :label="cr.label" :value="cr.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-row type="flex" justify="space-around" align="center">
              <el-button type="primary" size="mini" icon="el-icon-plus" class="mini"></el-button>
              <el-button size="mini" icon="el-icon-minus" class="mini"></el-button>
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
            <el-radio label="1">无变化</el-radio>
            <el-radio label="2">有变化</el-radio>
          </div>
        </div>
      </el-col>
    </el-row>
    <template v-show="t">
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
        <el-row class="padded-10">
          <el-col :span="3">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="4">
            <el-date-picker v-model="reportForm.id" ></el-date-picker>
            <el-select v-model="reportForm.id" size="mini">
              <el-option v-for="ta in talkType" :key="ta.label" :label="ta.label" :value="ta.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="5">
            <el-select v-model="reportForm.id" size="mini">
              <el-option v-for="ex in exit" :key="ex.label" :label="ex.label" :value="ex.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-row type="flex" justify="space-around" align="center">
              <el-button type="primary" size="mini" icon="el-icon-plus" class="mini"></el-button>
              <el-button size="mini" icon="el-icon-minus" class="mini"></el-button>
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
            <el-radio label="1">无变化</el-radio>
            <el-radio label="2">有变化</el-radio>
          </div>
        </div>
      </el-col>
    </el-row>
    <template v-show="t">
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
        <el-row class="padded-10">
          <el-col :span="3">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="reportForm.id" size="mini">
              <el-option v-for="sou in houseSources" :key="sou.label" :label="sou.label" :value="sou.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="reportForm.id" size="mini">
              <el-option v-for="pro in houseProperty" :key="pro.label" :label="pro.label" :value="pro.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="reportForm.name" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-row type="flex" justify="space-around" align="center">
              <el-button type="primary" size="mini" icon="el-icon-plus" class="mini"></el-button>
              <el-button size="mini" icon="el-icon-minus" class="mini"></el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </template>
  </el-form>

</template>

<script>
import { addRecord, updateRecord } from '@/api/article'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('report')

export default {
  name: 'ReportForm8',
  props: {
    reportForm: {
      type: Object,
      default() {
        return {
          person_id: '',
          report_id: '',
          person_report_id: '',
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
  inject: ['getList'],
  data() {
    return {
      fileUpload: '',
      archive_id: 15,
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
      education:[{
        label: '小学'
      },{
        label: '初中'
      },{
        label: '高中'
      },{
        label: '大学'
      }],
      maritalStatus:[{
        label: '结婚'
      },{
        label: '未婚'
      },{
        label: '已婚'
      },{
        label: '离异'
      },{
        label: '丧偶'
      },{
        label: '再婚'
      }],
      exit:[{
        label: '探亲'
      },{
        label: '访友'
      },{
        label: '学术交流'
      },{
        label: '就医'
      },{
        label: '旅游'
      },{
        label: '继承'
      },{
        label: '接受'
      },{
        label: '处理财产'
      }],
      criminal:[{
        label: '立案侦查'
      },{
        label: '审查起诉'
      },{
        label: '刑事审判'
      },{
        label: '刑罚执行'
      },{
        label: '执行完毕'
      },{
        label: '其他'
      }],
      houseSources: [{
        label: '购买'
      },{
        label: '继承'
      },{
        label: '接受赠与'
      },{
        label: '出售'
      },{
        label: '赠与他人'
      },{
        label: '其他来源'
      },{
        label: '其他去向'
      }],
      houseProperty: [{
        label: '商品房'
      },{
        label: '福利房'
      },{
        label: '经济适用房'
      },{
        label: '限价房'
      },{
        label: '自建房'
      },{
        label: '车库'
      },{
        label: '车位'
      },{
        label: '储藏间'
      },{
        label: '其他'
      }]
    }
  },
  methods: {
    ...mapMutations({
      closeDialog: 'toggleDialog',
      closeDetail: 'closeDetail'
    }),
    successUpload(response, file, fileList) {
      console.log(file)
      console.log(fileList)
      let fileArr = []
      for (file of fileList) {
        fileArr.push(file.name)
      }
      this.fileUpload = fileArr.join(',')
    },
    errorUpload(err, file, fileList) {
      console.log(err, file, fileList)
    },
    removeFile(file, fileList) {
      console.log(file, fileList)
    },
    createData() {
      let param = {
        archive_id: this.archive_id
      }
      let query = Object.assign(this.reportForm, param)
      // console.log(query)
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
