<template>
    <div class="top">
      <p class="title">主练部位</p>
      <MainBodyPart @clickCallback="mainBodyPartClick"></MainBodyPart>
      <!--<Table stripe :columns="columns1" :data="data1"></Table>-->
      <ul>
        <li class="header">
          <div class="left">动 作</div>
          <div class="right">次 数</div>
        </li>
        <li class="cellData">
          <div class="left" >动作1</div>
          <div class="right">
            20
          </div>
        </li>
        <li class="cell">
          <div class="left" @click="pickAction">点击选则动作</div>
          <div class="right">
            <InputNumber :max="10000" :min="0" ></InputNumber>
            <Button>确定</Button>
          </div>
        </li>
      </ul>
      <Button type="info" class="addOne">保 存</Button>
    </div>
</template>

<script>
  import MainBodyPart from  './MainBodyPart.vue'
    export default {
        components: {
          MainBodyPart,
        },
        data() {
            return {

            }
        },
        methods: {
          mainBodyPartClick(e){
            console.log("外面拿到值",e)
          },
          pickAction(){
          //周一下午写到选择动作
          }

        },
        props: {
            param: {}
        },
        computed: {},
        watch: {},
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        }
    }
</script>

<style scoped>
 .shuru{
   width: 100%;
   line-height: 50%;
   text-align: center;
   border: none;
  /*border-bottom: solid 1px #EEEEEF;*/


 }
 .shuru:focus{
   border: none;
   outline:none
 }
.title{
  text-align: left;
  margin-left:15px;
  margin-bottom:20px;

}
  .bottom{
    margin-top:30px;
  }
  .addOne{
    margin-top:10px;
    height: 40px;
    width: 50%;
  }
  ul{
    list-style: none;
    margin-top:20px;
    color: #495060;
  }
  ul>li{
    display: block;

  }
  .header{
    background-color: #f8f8f9;
    border-color: #CCC;
    border-width:1px;
    border-style: solid;
    border-radius: 2px;
    height: 44px;
    text-align: center;
  }
  .header .left{
    float: left;
    text-align: center;
    width: 50%;
    line-height:44px;
    font-weight: 600;
    font-size: 15px;
  }
  .header .right{
    float: right;
    width: 50%;
    text-align: center;
    line-height:44px;
    font-weight: 600;
    font-size: 15px;
  }
  .cell{
    background-color:#DDD ;
  }
  .cell,.cellData{
    /*background-color: #f8f8f9;*/
    /*border-color: ;*/
    border-bottom: #CCC 1px solid;
    border-left:  #CCC 1px solid;
    border-right:  #CCC 1px solid;
    border-radius: 2px;
    line-height:44px;
    font-size: 14px;
    height: 50px;
    text-align: center;
  }
  .cell .left{
    float: left;
    text-align: center;
    width: 50%;
    line-height:44px;
  }
  .cell .right{
    float: right;
    width: 50%;
    text-align: center;
    line-height:44px;

  }
 .cellData .left{
   float: left;
   text-align: center;
   width: 50%;
   line-height:44px;
 }
 .cellData .right{
   float: right;
   width: 50%;
   text-align: center;
   line-height:44px;
 }
</style>
