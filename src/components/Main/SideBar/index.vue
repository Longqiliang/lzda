<template>
  <div class="content-aside">
    <div class="aside-tit">
      <span>组织架构</span>
    </div>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>

<script>
import { queryOrganize } from '@/api/article'

export default {
  name: 'SideBar',
  data() {
    return {
      data: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      path: ''
    }
  },
  created() {
    this.getRoute()
    this.organizeList()
  },
  watch: {
    $route() {
      this.getRoute()
    }
  },
  methods: {
    organizeList() {
      queryOrganize().then(res => {
        let data = res.data
        console.log(res.data)
        if (data.success) {
          this.data = data.data
        }
      })
    },
    getRoute() {
      let matched = this.$route.matched.filter(item => item.path)
      let first = matched[0].path
      this.path = first
    },
    handleNodeClick(data) {
      // let path = `${this.path}/${data.name}`
      this.$router.push({
        name: this.path,
        params: { id: 123 }
        })
    }
  }
}
</script>

<style>

</style>
