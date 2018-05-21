<template>
  <el-dialog :visible.sync="DialogVisible" width="40%" center :before-close="closeDialog">
    <div slot="title">
      <el-select v-model="recordSelect" placeholder="请选择档案名称" @change="handleSelect">
        <el-option v-for="re in recordNumber" :key="re.name" :label="re.name" :value="re.archive_id"></el-option>
      </el-select>
      <div class="form-tit">{{titleChange}}</div>
    </div>
    <keep-alive>
      <component :is="formComponent"></component>
    </keep-alive>
    <div slot="footer" class="dialog-footer">
      <template v-if="status === 'create'">
        <el-button type="primary" @click="closeDialog">保 存</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import {
  SuperviseForm1,
  SuperviseForm2,
  SuperviseForm3
} from '@/components/Form/Supervise/index'

export default {
  name: 'SuperviseDialog',
  components: {
    SuperviseForm1,
    SuperviseForm2,
    SuperviseForm3
  },
  mounted() {
    this.recordSelect = this.recordNumber[0].archive_id
  },
  computed: {
    formComponent() {
      let obj = this.compareParam('archive_id', this.recordSelect)
      return 'SuperviseForm' + obj.type
    },
    titleChange() {
      let obj = this.compareParam('archive_id', this.recordSelect)
      return obj.name
    }
  },
  props: {
    DialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recordNumber: [
        {
          name: '巡察情况及巡察问题整改情况',
          archive_id: 15,
          type: 1
        },
        {
          name: '舆论监督情况（新闻媒体、自媒体、网络等）',
          archive_id: 16,
          type: 2
        },
        {
          name: '会议监督情况（参加或列席会议时发现的情况）',
          archive_id: 17,
          type: 3
        }
      ],
      recordSelect: 15,
      status: {
        type: String,
        default: 'detail'
      }
    }
  },
  methods: {
    compareParam(param, comparam) {
      let titleObj = this.recordNumber.find(i => {
        return i[param] === comparam
      })
      //console.log(titleObj)
      return titleObj
    },
    closeDialog() {
      this.$emit('update:DialogVisible', false)
    },
    handleSelect(e) {
      // console.log(e)
      // console.log(this.recordSelect)
    }
  }
}
</script>

<style>

</style>
