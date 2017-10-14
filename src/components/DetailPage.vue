<template>
  <div class="container">
    <navigation :title="title"></navigation>

    详细记录页面
    训练部位train_kind是：{{$route.params.partid}}
  </div>
</template>

<script>
  import IEcharts from 'vue-echarts-v3/src/full.vue';
  import Scroll from '../base/scroll.vue'
  import navigation from '../base/Navigation.vue'

  export default {
    components: {
      navigation,
      Scroll,
      IEcharts
    },
    data() {
      return {
        title: '详情',
        probeType: 3,
        listenScroll: true,
        loading: false,
        train_kinds_arr:[]
      }
    },
    methods: {
      scroll(e){

      }
    },
    props: {
      param: {}
    },
    computed: {},
    watch: {},
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  .container {
    position: fixed;
    z-index: 100;
    top: 20px;
    left: 0;
    bottom: 0;
    right: 0;
    background: deepskyblue;
    .listview {
      position: absolute;
      top: 64px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
  }
</style>
