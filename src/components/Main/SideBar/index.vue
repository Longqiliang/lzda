<template>
  <div class="content-aside">
    <div class="aside-tit">
      <span>组织架构</span>
    </div>
    <div class="content-tree">
      <div class="content-tree-scroll">
<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :draggable="false" accordion>
      </el-tree>
      </div>
      
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

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
    getRoute() {
      let matched = this.$route.matched.filter(item => item.path)
      let first = matched[0].path
      this.path = first
    },
    handleNodeClick(data, node) {
      let query
      if(data.unit_id){
        query = {
          unitId: data.unit_id,
          deptId: data.id
        }
      } else {
        query = {
          unitId: data.id
        }
      }
      this.$router.push({
        path: this.path,
        query: query
      })
    }
  }
}
</script>

<style>

</style>
