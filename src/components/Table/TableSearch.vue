<template>
  <div class="tab-search">
    <div class="search-group">
      <span class="input-label">单位：</span>
      <el-select v-model="selectVal" @change="handleChange" size="small">
        <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value"></el-option>
      </el-select>
      <span class="input-label">姓名：</span>
      <el-input v-model="input"></el-input>
      <div class="search-button inline">
        <el-button icon="el-icon-search" @click="handleSearch">查询</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableSearch',
  props: {
    options: {
      type: Array
    },
    selectVal: ''
  },
  data() {
    return {
      input: ''
    }
  },
  methods: {
    handleChange() {
      console.log(this.selectVal)
    },
    handleSearch() {}
  }
}
</script>

<style>

</style>
