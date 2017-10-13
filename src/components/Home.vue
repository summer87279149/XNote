<template>
  <div class="top">
    <navigation></navigation>
    <p class="title" style="font-size: 15px;margin-top:10px;text-align: left;margin-left: 15px; margin-bottom: 20px;">主练部位</p>
    <MainBodyPart @clickCallback="mainBodyPartClick"></MainBodyPart>
    <!--<Table stripe :columns="columns1" :data="data1"></Table>-->
    <ul>

      <li class="header">
        <div class="left">动 作</div>
        <div class="right">次 数</div>
      </li>
      <li :key="index" class="cellData" v-for="(item,index) in uploadActions" :ref="'a'+index">
        <!--<transition name="slide-fade">-->
        <div :class="{show:item.train_name_id}" class="left">{{item.pickActionMsg}}</div>
        <div :class="{show:item.train_name_id}" class="right">
          {{item.count}}
          &nbsp;&nbsp;
          <i  class="fa fa-close fa-2x" @click="cancel1(item.train_name_id,index)"></i>
        </div>
        <!--</transition>-->
      </li>

      <li class="cell">
        <!--<div class="left" @click="pickAction">-->
        <Dropdown class="left" trigger="click" @on-click="pickCallback">
          <div href="javascript:void(0)">
            {{pickActionMsg}}
            <span style="width: 0px;height: 0px;display: none">{{pickActionId}}</span>
            <Icon type="arrow-down-b"></Icon>
          </div>
          <DropdownMenu slot="list">
            <!---->
            <DropdownItem :key="item.train_name_id" v-for="item in actionsArr" :name="item.train_name"
                          @click="itemPick(item)">
              {{item.train_name}}
            </DropdownItem>
            <!---->
          </DropdownMenu>
        </Dropdown>
        <!--</div>-->
        <div class="right">
          <InputNumber :max="10000" :min="0" v-model="pickCounts"></InputNumber>
          &nbsp;
          <i class="fa fa-check fa-2x" aria-hidden="true" @click="submit"></i>
        </div>
      </li>
    </ul>


    <Spin v-show="isLoading" fix>
      <Icon type="load-c" size=18  class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <Button type="info" :disabled="uploadActions.length==0" class="addOne" @click="finallySave">保 存</Button>

  </div>
</template>

<script>
  import navigation from '../base/Navigation.vue'
  import MainBodyPart from './MainBodyPart.vue'
  import {gettrains, addtrains} from '../httprequest/api'
  import {setUserId, getUserId} from '../httprequest/userdefault'
  import {addClass} from '../common/js/dom'

  export default {
    components: {
      MainBodyPart,
      navigation
    },
    data() {
      return {
        isLoading: false,//是否正在网络请求中
        isCancing: false,//标志位，判断是否正在删除过程的动画中，如果是，则不能同时删除其他cell
        curretBodyPart: -1,
        actionsArr: [],//用户所有动作的数组
        pickActionMsg: '选择动作',//当前添加动作的name
        pickActionId: '',//当前添加动作的id
        pickCounts: 1,//当前添加动作的数量
        uploadActions: [],//前点添加的动作的数组
      }
    },
    methods: {
      //最终上传
      finallySave() {
        if (this.curretBodyPart < 0) {
          this.$Message.warning("请选择本次主练部位")
//          alert()
          return
        }
        let params = {
          "user_id": getUserId(),
          "train_kind": this.curretBodyPart,
          "actions": this.uploadActions
        }
        this.isLoading = true
        //这里写最终上传的API
        addtrains(params).then((res) => {
          console.log("最终上传结果是:", res)
          this.isLoading = false
          if (res.code == 200) {
            this.$Message.success(res.msg);
            this.uploadActions = []
            this.pickActionMsg = '选择动作'
          } else {
            this.$Message.error(res.msg);
          }

        }).catch((err) => {
          this.$Message.error("网络不正常");
          this.isLoading = false
        });

      },
      //删除数组指定元素,传入动作的id: train_name_id
      removeByValue(arr, val) {
        for (let obj of arr) {
          if (obj.train_name_id === val) {
            arr.splice(obj, 1);
            break;
          }
        }
      },
      itemPick(e) {
        console.log("itemPick", e)
      }
      ,
      cancel1(e, index) {
        if (this.isCancing) {
          return
        } else {
          this.isCancing = true
        }
        console.log("当前删除的index", index)
        let dom1 = 'a' + index
//        let dom2 = 'b'+e
//        console.log("dom1=",dom1,"; dom2=",dom2)
        console.log("当前dom", this.$refs[dom1])
//        console.log("this.$refs.dom2",this.$refs[dom2])
        addClass(this.$refs[dom1][0], 'hide')
//        addClass(this.$refs.dom2,'hide')
        setTimeout(() => {
          console.log("删除前:", this.uploadActions)
          this.removeByValue(this.uploadActions, e)
          console.log("删除后:", this.uploadActions)
          this.isCancing = false
        }, 500)
      }
      ,
      submit() {//提交当前添加的动作
        if (this.pickActionMsg == "选择动作") {
//          alert()
          this.$Message.warning('请选择动作');
          return;
        }
        this.uploadActions.push({
          "pickActionMsg": this.pickActionMsg,
          "train_name_id": this.pickActionId,
          "count": this.pickCounts
        })
//        this.removeByValue(this.actionsArr, this.pickActionId)

        console.log("this.uploadActions", this.uploadActions)
      }
      ,
      pickCallback(e) {
        this.pickActionMsg = e
        for (let obj of this.actionsArr) {
          if (obj.train_name === e) {
            this.pickActionId = obj.train_name_id
            console.log("当前pickActionId是", obj.train_name_id)
          }
        }
        console.log("外面拿到值", e)
      }
      ,
      mainBodyPartClick(e) {
        this.curretBodyPart = e
        console.log("this.curretBodyPart=", e)
      }
      ,
      pickAction() {
        //周一下午写到选择动作
      }

    },
    props: {
      param: {}
    }
    ,
    computed: {}
    ,
    watch: {
      uploadActions(newVlaue, oldValue) {
        if (newVlaue.length>0){

        }
      }
    }
    ,
    mounted() {
      console.log("user_id是", getUserId())
      gettrains(getUserId()).then((res) => {
        console.log("res是", res)
        this.actionsArr = res;
      })
    }
  }
</script>

<style type="text/less" scoped>
  /*.slide-fade-enter-active {*/
  /*transition: all .3s ease;*/
  /*}*/
  /*.slide-fade-leave-active {*/
  /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
  /*}*/
  /*.slide-fade-enter, .slide-fade-leave-to*/
  /*!* .slide-fade-leave-active for below version 2.1.8 *! {*/
  /*transform: translateX(10px);*/
  /*opacity: 0;*/
  /*}*/
  /*弹跳动画*/
  @keyframes goin {
    0% {
      transform: translate(0, 100%);
    }

    50% {
      transform: translate(0, -4px);
    }
    75% {
      transform: translate(0, 4px);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  /*插入cell动画*/
  .show {
    animation: goin 0.7s ease-in;
  }

  /*删除cell动画*/
  .hide {
    /*background-color: red;*/
    animation: goout 0.5s ease-in;
  }

  /*删除动画*/
  @keyframes goout {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(100%, 0);
    }
  }

  .shuru {
    width: 100%;
    line-height: 50%;
    text-align: center;
    border: none;
    /*border-bottom: solid 1px #EEEEEF;*/

  }

  .shuru:focus {
    border: none;
    outline: none
  }

  .title {
    margin-top:10px;
    text-align: left;
    margin-left: 15px;
    margin-bottom: 20px;

  }

  .bottom {
    margin-top: 30px;
  }

  .addOne {
    margin-top: 10px;
    height: 40px;
    width: 50%;
    margin-bottom:20px;
  }

  ul {
    list-style: none;
    margin-top: 20px;
    color: #495060;
  }

  ul > li {
    display: block;

  }

  .header {
    background-color: #f8f8f9;
    border-color: #CCC;
    border-width: 1px;
    border-style: solid;
    border-radius: 2px;
    height: 44px;
    text-align: center;
  }

  .header .left {
    float: left;
    text-align: center;
    width: 50%;
    line-height: 44px;
    font-weight: 600;
    font-size: 15px;
  }

  .header .right {
    float: right;
    width: 50%;
    text-align: center;
    line-height: 44px;
    font-weight: 600;
    font-size: 15px;
  }

  .cell {
    background-color: #DDD;
  }

  .cell, .cellData {
    /*background-color: #f8f8f9;*/
    /*border-color: ;*/
    border-bottom: #CCC 1px solid;
    border-left: #CCC 1px solid;
    border-right: #CCC 1px solid;
    border-radius: 2px;
    line-height: 44px;
    font-size: 14px;
    height: 50px;
    text-align: center;
  }

  .cell .left {
    float: left;
    text-align: center;
    width: 50%;
    line-height: 44px;
  }

  .cell .right {
    position: relative;
    float: right;
    width: 50%;
    text-align: center;
    line-height: 44px;

  }

  .cell .right > i {
    position: absolute;
    top: 10px;
  }

  .cellData .left {
    float: left;
    text-align: center;
    width: 50%;
    line-height: 44px;
  }

  .cellData .right {
    float: right;
    width: 50%;
    text-align: center;
    line-height: 44px;
    position: relative;
  }

  .cellData .right > i {
    position: absolute;
    top: 5px;
    /*right:10px;*/
  }


</style>
