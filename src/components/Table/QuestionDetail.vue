<template>
  <div>
  <h4>1.基本情况</h4>
  <el-table :data="tableDetail">
    <el-table-column label=""></el-table-column>
  </el-table>
  <h4>2.廉政电子档案</h4>
  <el-table :data="tableDetail">
    <el-table-column label=""></el-table-column>
  </el-table>
  </div>

</template>

<script>
export default {
  props: {
    tableDetail:{
      type: Object,
      default() {
        return {

        }
      }
    } 
  }
}
</script>

<style>

</style>
