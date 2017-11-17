<template>

    <div class="container2">
      <button v-show="showSetting" @click.prevent.stop="setting" class="settingbtn"></button>
      <button v-show="showbackbtn" @click.prevent.stop="back" class="backbtn"></button>
      <h2 class="title33">{{title}}</h2>
      <button v-show="showaddbtn" @click.prevent.stop="adda" class="addbtn"></button>
    </div>

</template>

<script>
  export default {
    components: {},
    data() {
      return {
        msg: '我是模版消息'
      }
    },
    methods: {
      setting(){
        this.$emit('showSetting')
      },
      back() {
        this.$router.go(-1)
      },
      adda(){
        this.$emit('adda')
      }
    },
    props: {
      title:{
        type:String,
        default:'title'
      },
      showbackbtn:{
        type:Boolean,
        default:true
      },
      showSetting:{
        type:Boolean,
        default:false
      },
      showaddbtn:{
        type:Boolean,
        default:false
      }
    },
    computed: {},
    watch: {},
    mounted() {
    }
  }
</script>

<style type="text/less" lang="less" scoped>


  .container2 {
    position: relative;
    /*z-index: 500;*/
    height: 44px;
    width: 100%;
    background-color: #1296db;
    .settingbtn{
      background: url("../assets/set.png") no-repeat center;
      background-size: 100%;
      width: 25px;
      height: 25px;
      border: none;
      float: left;
      margin-left: 3px;
      margin-top: 9px;

    }
    .backbtn {
      width: 30px;
      height: 30px;
      border: none;
      background: url("../assets/back.png");
      background-size: 100%;
      float: left;
      margin-left: 5px;
      margin-top: 7px;
      /*z-index: 300;*/
    }
    .addbtn{
      width: 30px;
      height: 30px;
      border: none;
      background: url("../assets/whiteadd.png");
      background-size: 100%;
      position: absolute;
      /*float: right;*/
      right: 5px;
      /*z-index: 101;*/
      top: 7px;
    }
    .title33{
      line-height: 44px;
      text-align: center;
      color: white;
      margin: 0 auto;
      /*position: relative;*/

    }
  }
</style>
