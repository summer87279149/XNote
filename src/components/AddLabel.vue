<template>
    <div class="container">
      <p class="hint" >动作标签：</p>
      <p class="hint" style="font-size: 12px;margin-bottom: 20px;">您训练常用的动作，例如(深蹲、卧推、硬拉、有氧等)</p>
      <input type="text" class="inputtext" placeholder="请输入您的动作标签" v-model="value">
      <button @click="addClicked"  class="addbtn"></button>
      <labels :titles="titles"></labels>

    </div>
</template>

<script>
  import labels from '../base/labels.vue'
  import {addTrainsName,gettrains} from '../httprequest/api'
  import {setUserId, getUserId} from '../httprequest/userdefault'
    export default {
        components: {labels},
        data() {
            return {
              value:'',
              titles:['暂无标签']
            }
        },
        methods: {

          addClicked(){
            if (this.value.length>15){
              this.$Message.warning("请输入15个字符以内的标签名")
              return
            }
            if(this.value.length == 0){
              this.$Message.warning("请填写标签名")
              return
            }
            addTrainsName(getUserId(),this.value).then((res)=>{
//              console.log("res====",res)
              if(res.code == 200){
                this.$Message.success(res.msg);
                this.titles.push(this.value)
                this.value = ""
              }else {
                this.$Message.error(res.msg);
              }
            }).catch((res)=>{
              this.$Message.error("网络出错");
            })
          }
        },
        props: {

        },
        computed: {},
        watch: {},
        mounted() {
          gettrains(getUserId()).then((res)=>{
            console.log("数组是:",res)
            var tempArr = []
            for(let obj of res){
              tempArr.push(obj.train_name)
            }
            this.titles = tempArr
          }).catch((res)=>{
            this.$Message.error("网络出错");
          })

        }
    }
</script>

<style type="text/less" lang="less" scoped>
  .container{
    .hint{
      text-align: start;
      margin-left: 10px;
      font-size: 15px;
    }
    .inputtext{
      margin-top:40px;
      border: none;
      /*background-color: red;*/
      height: 40px;
      width: 80%;
      display: inline-block;
      margin: 0 auto;
      outline: none;
      font-size: 15px;
    }
    .addbtn{
      border: none;
      position: relative;
      top:10px;
      display: inline-block;
      background: url("../assets/add.png") no-repeat center ;
      background-size: 100%;
      width: 25px;
      height:25px;
    }
  }




</style>
