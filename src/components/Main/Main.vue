<template>
  <el-container :class="{'is-collapse': isCollapse}" class="main-bg">
    <transition name="slide">
      <el-aside v-if="!isCollapse">
        <SideBar @togglecollapse="hideSideBar"/>
      </el-aside> 
      <div class="aside-collapse" v-else @click="showSideBar">
        <i class="el-icon-arrow-right"></i>
      </div>
    </transition>
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

export default {
  name: 'Main',
  components: {
    SideBar,
    Breadcrumb
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    hideSideBar(val) {
      this.isCollapse = val
    },
    showSideBar() {
       this.isCollapse = false
    }
  }
}
</script>

<style>

</style>
