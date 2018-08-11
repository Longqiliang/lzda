<template>
  <el-container class="main-bg">
    <el-aside>
      <cSidebar @handleNodeClick="handleNodeClick"/>
    </el-aside>
    <el-main class="content-main">
      <Breadcrumb />
      <cMain :query="query"/>
    </el-main>
  </el-container>
</template>

<script>
import cSidebar from './cSidebar'
import cMain from './cMain'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    cSidebar,
    cMain,
    Breadcrumb
  },
  data () {
    return {
      query:{
      }
    }
  },
  methods: {
    handleNodeClick(query) {
      this.query = query
    }
  }
}
</script>

<style>

</style>
