
<template>
  <div class="content-aside">
    <div class="aside-tit">
      <span>组织架构</span>
    </div>
    <div class="content-tree">
      <div class="content-tree-scroll">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :draggable="false" :highlight-current="true" :default-expand-all="true" :expand-on-click-node="false">
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      data: [{
        archive_type_id: 1,
        name: '问题与惩戒',
        children: [{
          archive_id: 1,
          name: '问题线索情况'
        },{
          archive_id: 5,
          name: '信访举报调查处理情况'
        },{
          archive_id: 6,
          name: '谈话情况'
        },{
          archive_id: 24,
          name: '函询情况'
        },{
          archive_id: 26,
          name: '立案情况'
        },{
          archive_id: 19,
          name: '谈话提醒情况'
        },{
          archive_id: 20,
          name: '诫勉谈话情况'
        },{
          archive_id: 4,
          name: '受到问责情况'
        },{
          archive_id: 21,
          name: '受到其它组织措施情况'
        },{
          archive_id: 7,
          name: '受到党纪处分情况'
        },{
          archive_id: 22,
          name: '受到政务处分情况'
        },{
          archive_id: 18,
          name: '移送司法情况'
        },{
          archive_id: 3,
          name: '廉政谈话情况'
        },{
          archive_id: 2,
          name: '党风廉政意见回复情况'
        }] 
      },{
        archive_type_id: 2,
        name: '有关报告情况',
        children:[{
          archive_id: 10,
          name: '领导干部民主生活会发言材料、民主评议及民主测评情况'
        },{
          archive_id: 8,
          name: '领导干部任期或离任经济责任审计报告'
        },{
          archive_id: 11,
          name: '领导干部述责述廉报告'
        },{
          archive_id: 14,
          name: '出国、赴台港澳备案情况'
        },{
          archive_id: 9,
          name: '个人事项报告'
        },{
          archive_id: 12,
          name: '婚嫁事宜报告表'
        },{
          archive_id: 13,
          name: '丧事办理报告表'
        },{
          archive_id: 23,
          name: '其他喜庆事宜'
        }]
      },{
        archive_type_id: 3,
        name: '日常监督',
        children: [{
          archive_id: 15,
          name: '巡察情况及巡察问题整改情况'
        },{
          archive_id: 16,
          name: '舆论监督情况（新闻媒体、自媒体、网络等）'
        },{
          archive_id: 17,
          name: '会议监督情况（参加或列席会议时发现的情况）'
        },{
          archive_id: 25,
          name: '监督检查情况'
        }]     
      }]
    }
  },
  methods: { 
    handleNodeClick(data, node) {
      let query = {}
      if(data.archive_id){
       let archive_type_id = node.parent.data.archive_type_id
        query = {
          archive_type_id: archive_type_id,
          archive_id: data.archive_id
        }
      }else {
        query = {
         archive_type_id: data.archive_type_id
        } 
      }
      this.$emit('handleNodeClick', query)
    }
  }
}
</script>

<style>

</style>
