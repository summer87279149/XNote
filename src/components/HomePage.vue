<template>
  <div class="container">
    <Navigation :title="title" :showbackbtn="false" :showSetting="true" @showSetting="pushSetting"></Navigation>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <scroll @scroll="scroll"
            :listen-scroll="listenScroll"
            :probe-type="probeType"
            :data="train_kinds_arr"
            class="listview"
            ref="listview">
      <ul class="tableview">
        <li class="cell" v-for="item in train_kinds_arr">
          <div class="header">
            <p class="title">{{item.name}}</p>
            <div class="detailbtn">查看详情 ></div>
          </div>
          <div class="contentview">
            这里是图表
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import Scroll from '../base/scroll.vue'
  import Navigation from '../base/Navigation.vue'
  import {getTrainKinds, getTrainDateAndID} from '../httprequest/api'
  import {setUserId, getUserId} from '../httprequest/userdefault'

  export default {
    components: {
      Navigation,
      Scroll
    },
    data() {
      return {
        title:"主页",
        train_kinds_arr: [],
        probeType:3,
        listenScroll:true,
      }
    },
    methods: {
      scroll(pos) {
        this.scrollY = pos.y
        console.log("当前滚动位置是:", pos.y)
      },
      pushSetting(){
        console.log('显示setting页面')
        this.$router.push('/home/setting')
      }
    },
    props: {
      param: {}
    },
    computed: {},
    watch: {},
    created() {
      this.probeType = 3
      this.listenScroll = true

    },
    created() {


    },
    mounted() {

      getTrainKinds(getUserId()).then(res => {
        if (res.code == 200) {
          let arr = []
          for (let obj of res.data) {
            switch (obj.train_kind) {
              case 0:
                obj.name = "胸部训练"
                break;
              case 1:
                obj.name = "背部训练"
                break;
              case 2:
                obj.name = "腿部训练"
                break;
              case 3:
                obj.name = "腰腹训练"
                break;
              case 4:
                obj.name = "肩臂训练"
                break;
              case 5:
                obj.name = "有氧运动"
                break;
              default:
                obj.name = "未知运动"
                break;
            }
            arr.push(obj)

          }
          this.train_kinds_arr = arr
//          this.$refs.listview.refresh()

        } else {
        }

      }).catch((err) => {
        this.$Message.error("网络不正常");
//            this.isLoading = false
      });
    }
  }
</script>

<style lang="less" scoped>
  .container {
    .listview{
      position: absolute;
      top:64px;
      bottom: 0;
      left:0;
      right: 0;
      overflow: hidden;
    }
    .tableview {
      list-style: none;
      .cell {
        .header {
          height: 20px;
          /*background-color: red;*/
          line-height: 20px;
          background-color: lightgray;
          .title {
            float: left;
            margin-left: 10px;
          }
          .detailbtn {
            float: right;
            margin-right: 10px;
          }
        }
        .contentview {

        }
      }
    }
  }
</style>
