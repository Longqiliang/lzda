<template>
  <div class="content-view">
    <div class="content-nav">
      <ul class="content-menu">
        <li class="menu-item">
          <i class="iconfont icon-user"></i>
          管理员
        </li>
        <li class="menu-item active" @click="closeAllTags">
          <i class="iconfont icon-checkout"></i>
          退出
        </li>
      </ul>
      <div class="content-row">
        <a class="content-btn" href="http://172.16.64.43:8087/ps_bigdata/login/index">
          <i class="iconfont icon-ptsy"></i>平台首页</a>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    closeAllTags() {
      //this.$store.dispatch('delAllViews')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
[class*=' icon-'],
[class^='icon-'] {
  color: #c53333;
}
.icon-user {
  font-size: 22px;
  font-weight: bold;
}
.icon-checkout {
  font-size: 21px;
}
</style>
