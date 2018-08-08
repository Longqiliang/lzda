<template>
  <div class="tab-search">
    <div class="search-group">
      <span class="input-label">单位：</span>
      <el-cascader placeholder="请输入" :options="options" :props="organizesProps" :clearable="true" filterable change-on-select @change="handleChange"></el-cascader>
      <span class="input-label">姓名：</span>
      <el-input v-model="name"></el-input>
      <template v-if="archiveOptions">
        <span class="input-label">档案名称：</span>
        <el-select v-model="selectVal" @change="handleArchiveChange" size="small">
          <el-option v-for="item in archiveOptions" :key="item.archive_id" :label="item.archive_name" :value="item.archive_id"></el-option>
        </el-select>
      </template>
      <div class="inline">
        <el-button icon="el-icon-search" @click="handleSearch" type="primary" class="search-btn">查询</el-button>
      </div>
      <div class="search-button inline" v-if="isCreate">
        <el-button type="primary" @click="handleCreate">新增</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TableSearch',
  props: {
    deptId: {
      type: String
    },
    archiveOptions: {
      type: Array
    },
    isCreate: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      options: 'organizes'
    })
  },
  data() {
    return { 
      organizesProps: {
        label: 'name',
        children: 'children',
        value: 'id'
      },
      name: null,
      dept_id: null,
      unitId: null,
      path: null,
      selectVal: null
    }
  },
  watch: {
    $route() {
      this.getRoute()
    }
  },
  methods: {
    getRoute() {
      let matched = this.$route.matched.filter(item => item.path)
      let first = matched[0].path
      this.path = first
    },
    handleChange(val) {
      if(val.length) {
        this.unitId = val[0]
        if(val.length > 1) {
          this.dept_id = val[1]
        }else {
          this.dept_id = null
        }
      }else {
        this.unitId = null
        this.dept_id = null
      }
    },
    handleCreate() {
      this.$emit('handleCreate')
    },
    handleArchiveChange(val) {
      this.selectVal = val
    },
    handleSearch() {
      const query = {
        unit_id: this.unitId,
        dept_id: this.dept_id,
        user_name: this.name,
        archive_id :this.selectVal
      }
      this.$emit('handleSearch',query)
    }
  }
}
</script>

<style>

</style>
