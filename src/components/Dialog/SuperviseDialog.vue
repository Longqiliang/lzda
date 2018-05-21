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
      return 'SuperviseForm' + (this.recordSelect ? this.recordSelect : 1)
    },
    titleChange() {
      let titleObj = this.recordNumber.find(i => {
        return i.archive_id === this.recordSelect
      })
      return titleObj.name
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
          archive_id: 15
        },
        {
          name: '舆论监督情况（新闻媒体、自媒体、网络等）',
          archive_id: 16
        },
        {
          name: '会议监督情况（参加或列席会议时发现的情况）',
          archive_id: 17
        }
      ],
      recordSelect: 1,
      status: {
        type: String,
        default: 'detail'
      }
    }
  },
  methods: {
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
