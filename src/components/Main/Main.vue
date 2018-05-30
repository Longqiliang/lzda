<template>
  <el-container>
    <el-aside width="215px" style="display:flex;">
      <SideBar />
    </el-aside>
    <el-main class="content-main">
      <Breadcrumb/>
      <!-- <Table/> -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-main>
  </el-container>
</template>

<script>
import { SideBar, Breadcrumb } from './index'
import { mapActions } from 'vuex'

export default {
  name: 'Main',
  components: {
    SideBar,
    Breadcrumb
  },
  created() {
    this.getInfo()
  },
  methods: {
    ...mapActions({
      getInfo: 'GetInfo'
    })
  },
  data() {
    return {}
  }
}
</script>

<style>

</style>
