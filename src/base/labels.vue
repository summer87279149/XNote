<template>
  <div class="container">
    <div class="wrapline"></div>
    <ul>
      <li :key="index" v-for="(item,index) in titles" :style="getRandomColor(index)" v-finger:long-tap="longtouch.bind(this,index)" ref="touchArea"   >{{item}}</li>
    </ul>
    <p >长按标签删除动作</p>
  </div>
</template>

<script>

  export default {
    components: {},
    data() {
      return {
        msg: '我是模版消息',
        colors:['#1296db','#2ecc71','#2c3e50','#f1c40f','#e74c3c']

      }
    },
    methods: {
      longtouch(item){
        this.$emit("remove",item)
      },
      getRandomColor(e) {
        let a = e%5;
        return {color:this.colors[a]}
      }
    },
    props: {
      titles: {
        type: Array,
        default: ['2','2','3','4']
      }
    },
    computed: {},
    watch: {},
    mounted() {
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .container{
    .wrapline{
      margin: 0 auto;
      width: 95%;
      height: 1px;
      background-color: lightgray;
    }
    ul{
      margin-top:10px;
      list-style: none;
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      flex-wrap:wrap;
      justify-content: flex-start;
      align-items:center;
      li{

        border-radius:20px ;
        height: 25px;

        line-height: 25px;
        border: lightgray 1px solid;
        margin-left: 20px;
        margin-bottom:20px;
        padding-left: 5px;
        padding-right:5px;

      }
    }

  }
</style>
