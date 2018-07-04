<template>
  <el-container>
    <el-aside>
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

export default {
  name: 'Main',
  components: {
    SideBar,
    Breadcrumb
  }
}
</script>

<style>

</style>
