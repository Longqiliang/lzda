<template>
  <div>
     <TableSearch @handleSearch="handleSearch" :isCreate="false"/>
      <el-row :gutter="10" >
        <el-col :xl="4" :lg="6" :md="8" v-for="(li,i) in list" :key="i">
          <div class="person-card" @click="jumpTo(li)">
            <div class="person-img">
              <template v-if="li.sex === '2'">
                <img src="../../assets/images/women.png">
              </template>
              <template v-else>
                <img src="../../assets/images/man.png">
              </template>
            </div>
            <div class="person-info">
              <h5 class="person-tit ellipsis">{{li.name}}</h5>
              <p class="person-content ellipsis-2" :title="li.unitname">{{li.unitname}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="table-footer">
        <el-pagination background :total="total" :current-page="listQuery.pageIndex" :page-size="listQuery.pageSize" layout="total, pager, ->, jumper" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import TableSearch from '@/components/Table/TableSearch'
import { queryTermPerson } from '@/api/article'

export default {
  name: 'person',
  components: { TableSearch },
  data() {
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 30
      },
      total: null,
      list: null
    }
  },
  props: {
    unitId: {
      type: String
    },
    deptId: {
      type: String
    },
    name: {
      type: String
    }
  },
    created() {
    this.getPersonList()
  },  
  watch: {
    $route(val) {
      let matched = this.$route.matched.filter(item => item.path)
      let first = matched[0].path
      if (first === '/portrayal') {
        this.getPersonList()
      }
    }
  },  
  methods: {
    jumpTo(e) {
      this.$router.push({path: `/portrayal/detail/${e.id}`, query: {
          name: e.name,
          sex: e.sex,
          rank: e.rank,
          politicalstatus: e.politicalstatus,
          unitname: e.unitname,
          age: e.age,
          education: e.education,
          origin: e.origin,
          idcard: e.idcard
      }})
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getPersonList()
    },
    getPersonList(param = {
      unit_id: this.unitId,
        dept_id: this.deptId,
        name: this.name
    }) {
      let query = Object.assign(param, this.listQuery)
      this.loading = true
      queryTermPerson(query).then(res => {
        this.loading = false
        let data = res.data
        if (data.success) {
          this.list = data.data
          this.total = data.allsize
        }
      })
    },
    handleSearch(query) {
      this.getPersonList(query)
    }
  }
}
</script>

<style lang="scss">
.person-card {
  $font-size: 14px;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 10px 12px;
  margin-bottom: 10px;
  cursor: pointer;
  .person-img {
    flex-basis: 60px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    img {
      width: 100%;
    }
  }
  .person-info {
    flex: 1;
    .person-tit {
      line-height: 1.2;
      font-size:  18px;
      font-weight: normal;
      margin: 0;
    }
    .person-content {
      margin: 0;
      padding-top: 8px;
      height: 50px;
    }
  }
}
</style>
