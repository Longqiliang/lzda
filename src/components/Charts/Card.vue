<template>
  <div class="chart-card center">
    <template v-if="card">
      <div class="card-item">
        <div class="card-item-tit">单位</div>
        <div class="card-item-content">
          <span class="card-item-content_input">{{card.unitcount}}</span>个
        </div>
      </div>
      <div class="card-item">
        <div class="card-item-tit">人员</div>
        <div class="card-item-content">
          <span class="card-item-content_input">{{card.personcount}}</span>人
        </div>
      </div>
      <div class="card-item">
        <div class="card-item-tit">详情报告</div>
        <div class="card-item-content">
          <span class="card-item-content_input">{{card.detailedcount}}</span>份
        </div>
      </div>
      <div class="card-item">
        <div class="card-item-tit">处分情况</div>
        <div class="card-item-content">
          <span class="card-item-content_input">{{card.dispositioncount}}</span>人/次
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { queryBasicInfo } from '@/api/article'

export default {
  created() {
    queryBasicInfo().then(res => {
      const data = res.data
      if (data.success) {
        this.card = data.data
      }
    })
  },
  data() {
    return {
      card: null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/_variables.scss';
.chart-card {
  flex: 1;
  padding: 5% 0;
  display: flex;
  flex-direction: column;
  &.center {
    justify-content: center;
  }
  .card-item {
    font-size: 18px;
    display: flex;
    align-items: center;
    margin-bottom: 5%;
    &-tit {
      flex-basis: 40%;
      padding-left: 10%;
    }
    &-content {
      flex: 1;
      &_input {
        display: inline-block;
        width: 60%;
        margin-right: 5%;
        text-align: right;
        padding: 5px;
        font-size: 20px;
        border: 2px solid #fa6700;
        color: $view-color;
      }
    }
  }
}
</style>
