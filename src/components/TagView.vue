<template>
  <div class="content-view">
    <h1>
      <router-link to="index">
        <img src="../assets/logo.png" alt="lzda-logo" class="nav-logo">
      </router-link>
    </h1>
    <div class="content-nav">
      <ul class="content-menu">
        <li class="menu-item">
          <i class="iconfont icon-setting"></i>
          系统设置
        </li>
        <li class="menu-item">
          <i class="iconfont icon-user"></i>
          {{getUser}}
        </li>
        <li class="menu-item active" @click="closeAllTags">
          <i class="iconfont icon-checkout"></i>
          退出
        </li>
      </ul>
      <!-- <div class="content-row">
        <a class="content-btn" href="http://172.16.64.43:8087/ps_bigdata/login/index">
          <i class="iconfont icon-ptsy"></i>平台首页</a>
      </div> -->

    </div>

  </div>
</template>

<script>
import { layout } from '@/api/article'
import { getToken, removeToken } from '@/utils/auth'
export default {
  name: 'Header',
  data () {
    return {
       username: null
    }
  },
  computed: {
    getUser() {
      this.username = getToken()
      return this.username
    }
  },
  methods: {
    closeAllTags() {
      removeToken()
      //this.$store.dispatch('delAllViews')
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
[class*=' icon-'],
[class^='icon-'] {
  color: #fff;
  margin-right: 5px;
}
.icon-setting {
  font-size: 22px;
}
.icon-user {
  font-size: 22px;
  font-weight: bold;
}
.icon-checkout {
  font-size: 21px;
}
</style>
