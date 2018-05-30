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
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'SideBar',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      path: ''
    }
  },
  created() {
    this.getRoute()
    this.getOrganize()
  },
  watch: {
    $route() {
      this.getRoute()
    }
  },
  computed: {
    ...mapGetters({
      data: 'organizes'
    })
  },
  methods: {
    ...mapActions({
      getOrganize: 'GetOrganize'
    }),
    getRoute() {
      let matched = this.$route.matched.filter(item => item.path)
      console.log(matched)
      let first = matched[0].path
      this.path = first
    },
    handleNodeClick(data, node) {
      console.log(data)
      console.log(node)
      let id = data.id
      // this.$router.push({
      //   path: this.path,
      //   query:　{ id : id}
      // })
      // let path = `${this.path}/${data.name}`
      // this.$router.push({
      //   name: this.path,
      //   params: { id: 123 }
      //   })
    }
  }
}
</script>

<style>

</style>
