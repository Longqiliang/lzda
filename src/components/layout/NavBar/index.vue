<template>
  <el-menu :router="true" :default-active="routePath" mode="horizontal" text-color="#fff" active-text-color="#054E9B" background-color="#3471e1">
    <template v-for="item in routes">
      <template v-if="!item.hidden">
        <router-link :to="item.path" :key="item.name">
          <el-menu-item :index="item.path" :key="item.name">
            <span slot="title">
              <i :class="iconName(item.meta.icon)"></i>{{item.meta.title}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </template>
    <!-- <a href="http://172.16.64.43:8087/ps_bigdata/login/index" target="_blank"> -->
    <a href="http://192.168.0.202:9009/ps_bigdata/login/index" target="_blank">
      <el-menu-item index="index">
        <span slot="title">
          <i class="iconfont icon-ptsy"></i>平台首页
        </span>
      </el-menu-item>
    </a>
  </el-menu>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    routes() {
      return this.$router.options.routes
    },
    routePath() {
      let arr = this.$route.path.split('/')
      let path = '/' + arr[1]
      return path
    }
  },
  methods: {
    iconName(icon) {
      return `iconfont icon-${icon}`
    }
  }
}
</script>

<style lang="scss" scoped>
$font: 19px;
$icon-font: 26px;
.el-menu--horizontal {
  padding-left: 2%;
  border-bottom: none;
  .el-menu-item {
    float: left;
    margin: 0;
    font-size: $font;
    padding: 0 1%;
    height: 40px;
    line-height: 40px;
    // font-weight: bold;
    &.is-active {
      border-bottom: 2px solid transparent !important;
      background-color: #fff !important;
      i{
        color: inherit;
      }
    }
    i {
      color: #fff;
      font-size: $icon-font;
      margin-right: 3px;
      font-weight: normal;
    }
  }
}
</style>
