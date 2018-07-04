<template>
  <div class="app-wrapper">
    <el-container>
      <el-header height="auto" style="padding: 0;">
        <TagView/>
        <NavBar/>
      </el-header>
      <el-main class="main el-scrollbar">
        <div class="scroll_wrap">
          <AppMain/>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { NavBar, AppMain, TagView } from './index'
export default {
  name: 'LayOut',
  components: {
    TagView,
    NavBar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
.content{
  .main{
    padding: 10px;
  }
}
</style>
