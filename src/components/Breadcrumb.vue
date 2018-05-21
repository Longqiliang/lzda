<template>
  <div class="breadcrumb">
    <div class="el-breadcrumb-tit">当前位置：</div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in hasTitleList" :key="item.path">
          <span v-if="index==list.length - 1" class="no-redirect">{{item.meta.title}}</span>
          <router-link v-else :to="item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>

</template>

<script>
export default {
  name: 'Breadcrumb',
  created () {
    this.getRoute()
  },
  data () {
    return {
      list: null
    }
  },
  computed: {
    hasTitleList () {
      return this.list.filter(item => item.meta.title)
    }
  },
  watch: {
    $route () {
      this.getRoute()
    }
  },
  methods: {
    getRoute () {
      let matched = this.$route.matched.filter(item => item.path)
      this.list = matched
    }
  }
}
</script>

<style lang="scss">
.breadcrumb{
  display: flex;
  padding: 12px;
  font-size: 16px;
  .el-breadcrumb{
    &-tit{
      line-height: 1;
    }
    font-size: 16px;
  }
}
</style>
