<template>
  <transition name="slide">
    <div class="container">
      <navigation class="nav" :title="navTitle" :showbackbtn="true" :showaddbtn="false"
                  :showSetting="false"></navigation>
      <p class="hint">动作标签：</p>请自定义输入您训练时常用的动作名，例如(深蹲、仰卧起坐、跳绳等)
      <input type="text" class="inputtext" placeholder="请输入您的动作名作为标签" v-model="value">
      <button @click="addClicked" class="addbtn"></button>
      <labels :titles="titles" @remove="remove"></labels>
      <Modal
        v-model="modelIsShow"
        title="注意⚠️"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>"您将要删除该动作,删除后将删除所有相关的锻炼记录且无法恢复，确定要删除吗？"</p>
      </Modal>
    </div>
  </transition>
</template>

<script>
  import navigation from '../base/Navigation.vue'
  import labels from '../base/labels.vue'
  import {addTrainsName, gettrains, removeTrainsName} from '../httprequest/api'
  import {setUserId, getUserId} from '../httprequest/userdefault'

  export default {
    components: {

      labels,
      navigation,

    },
    data() {
      return {
        modelIsShow:false,
        navTitle: "动作管理",
        value: '',
        titles: ['暂无标签'],
        modal1:"",
        currentRemeveIndex:-1
      }
    },
    methods: {
      ok() {
        this.modelIsShow = false
        removeTrainsName(getUserId(), this.titles[this.currentRemeveIndex]).then(res => {
          console.log("删除结果是：", res);
          if (res.code == 200) {
            this.titles.splice(this.currentRemeveIndex, 1)
            this.$Message.warning("注意:您已删除该动作")
          } else {
            this.$Message.error("删除失败")
          }
        }).catch(res => {
          this.$Message.error("网络异常")
        })
      },
      cancel() {
        this.modelIsShow = false
      },
      remove(itemIndex) {
        this.modelIsShow = true
        this.currentRemeveIndex = itemIndex;

      },
      addClicked() {
        if (this.value.length > 15) {
          this.$Message.warning("请输入15个字符以内的标签名")
          return
        }
        if (this.value.length == 0) {
          this.$Message.warning("请填写标签名")
          return
        }
        addTrainsName(getUserId(), this.value).then((res) => {
//              console.log("res====",res)
          if (res.code == 200) {
            this.$Message.success(res.msg);
            this.titles.push(this.value)
            this.value = ""
          } else {
            this.$Message.error(res.msg);
          }
        }).catch((res) => {
          this.$Message.error("网络出错");
        })
      }
    },
    props: {},
    computed: {},
    watch: {},
    mounted() {
      gettrains(getUserId()).then((res) => {
//        console.log("数组是:", res)
        var tempArr = []
        for (let obj of res) {
          tempArr.push(obj.train_name)
        }
        this.titles = tempArr
      }).catch((res) => {
        this.$Message.error("网络出错");
      })

    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .nav {
    z-index: 1000;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }

  .container {
    z-index: 102;
    position: absolute;
    /*width: 100%;*/
    height: 100%;
    top:20px;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: white;
    .hint {
      margin-top: 10px;
      text-align: start;
      margin-left: 10px;
      font-size: 15px;
    }
    .inputtext {
      margin-top: 40px;
      border: none;
      /*background-color: red;*/
      height: 40px;
      width: 80%;
      display: inline-block;
      margin: 0 auto;
      outline: none;
      font-size: 15px;
    }
    .addbtn {
      border: none;
      position: relative;
      top: 10px;
      display: inline-block;
      background: url("../assets/add.png") no-repeat center;
      background-size: 100%;
      width: 25px;
      height: 25px;
    }
  }


</style>
