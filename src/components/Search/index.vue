<template>
  <div class="tab-search">
    <div class="search-group">
      <span class="input-label">单位：</span>
      <el-cascader placeholder="请输入" :options="options" :props="organizesProps" :clearable="true" filterable change-on-select @change="handleChange"></el-cascader>
      <!-- <el-select v-model="selectVal" @change="handleChange" size="small">
        <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value"></el-option>
      </el-select> -->
      <span class="input-label">姓名：</span>
      <el-input v-model="name"></el-input>
      <div class="search-button inline">
        <el-button icon="el-icon-search" @click="handleSearch">查询</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TableSearch',
  props: {
    selectVal: '',
    deptId: {
      type: String
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
      path: null
    }
  },
  methods: {
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
    handleSearch() {
      const query = {
        unitId: this.unitId,
        deptId: this.dept_id,
        name: this.name
      }
      this.$emit('handleSearch', query)
      // this.$router.push({
      //     path: this.path,
      //     query: query
      //   })
    }
  }
}
</script>

<style>

</style>
