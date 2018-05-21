<template>
  <el-menu :router="true" :default-active="routePath" mode="horizontal" text-color="#fff" active-text-color="#fff" background-color="#c53333">
    <template v-for="item in routes">
      <router-link :to="item.path" :key="item.name">
        <el-menu-item :index="item.path" :key="item.name">
          <span slot="title">
            <i :class="iconName(item.meta.icon)"></i>{{item.meta.title}}</span>
        </el-menu-item>
      </router-link>
    </template>
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
.el-menu--horizontal {
  padding-left: 2%;
  border-bottom: none;
  .el-menu-item {
    float: left;
    margin: 0;
    font-size: 18px;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    &.is-active {
      border-bottom: 2px solid transparent !important;
      background-color: #fa6700 !important;
    }
    i {
      color: #fff;
      font-size: 26px;
      margin-right: 3px;
    }
  }
}
</style>
