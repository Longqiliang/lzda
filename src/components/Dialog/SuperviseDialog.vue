<template>
  <el-dialog :visible.sync="dialogTableVisible" width="600px" center :before-close="closeDialog" v-el-drag-dialog>
    <div slot="title">
      <template v-if="status === 'create'">
        <el-select v-model="recordSelect" placeholder="请选择档案名称" @change="changeSelect">
          <el-option v-for="re in recordNumber" :key="re.name" :label="re.name" :value="re.archive_id"></el-option>
        </el-select>
      </template>
      <div class="form-tit">{{titleChange}}</div>
    </div>
    <component :is="formComponent" :user="user" :status="status" ref="children" :superviseForm="formVal" @closeLoad="closeLoading"></component>
    <div slot="footer" class="dialog-footer">
      <template v-if="status === 'create'">
        <el-button type="primary" @click="handleCreate" :loading="submitLoading">保 存</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </template>
      <template v-else-if="status === 'update'">
        <el-button type="primary" @click="handleUpdate">保 存</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </template>
      <template v-else-if="status === 'detail'"></template>
    </div>
  </el-dialog>
</template>

<script>
import {
  SuperviseForm1,
  SuperviseForm2,
  SuperviseForm3,
  SuperviseForm4
} from '@/components/Form/Supervise/index'
import { mapState, mapActions, mapMutations } from 'vuex'
import elDragDialog from '@/directive/el-dragDialog'

export default {
  name: 'SuperviseDialog',
  directives: {
    elDragDialog
  },
  components: {
    SuperviseForm1,
    SuperviseForm2,
    SuperviseForm3,
    SuperviseForm4
  },
  computed: {
    ...mapState({
      dialogTableVisible: state => state.supervise.dialogShow,
      status: state => state.supervise.status,
      type: state => state.supervise.superviseForm,
      formVal: state => state.supervise.formVal,
      user: state => state.app.info
    }),
    recordSelect: {
      get() {
        return parseInt(this.type)
      },
      set(value) {
        return this.setSuperviseForm(value)
      }
    },
    formComponent() {
      let obj = this.compareParam('archive_id', parseInt(this.type))
      return 'SuperviseForm' + obj.type
    },
    titleChange() {
      let obj = this.compareParam('archive_id', parseInt(this.type))
      return obj.name
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
        },
        {
          name: '监督检查情况',
          archive_id: 25,
          type: 4
        }
      ],
      submitLoading: false
    }
  },
  methods: {
    ...mapMutations({
      closeDialog: 'supervise/toggleDialog',
      setSuperviseForm: 'supervise/setSuperviseForm',
      setFormVal: 'supervise/setFormVal'
    }),
    getForm() {},
    changeSelect() {
      this.setFormVal({})
    },
    compareParam(param, comparam) {
      let titleObj = this.recordNumber.find(i => {
        return i[param] === comparam
      })
      return titleObj
    },
    handleCreate() {
      this.submitLoading = true
      this.$refs.children.createData()
    },
    handleUpdate() {
      this.$refs.children.updateData()
    },
    closeLoading() {
      this.submitLoading = false
    }
  }
}
</script>

<style>

</style>
