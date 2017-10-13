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
        <li class="cell" v-for="(item,index) in train_kinds_arr">
          <div class="header">
            <p class="title">{{item.name}}</p>
            <div class="detailbtn">查看详情 ></div>
          </div>
          <div class="contentview">
            <IEcharts v-if="canshow" :option="getOptions(index)" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import IEcharts from 'vue-echarts-v3/src/full.vue';
  import Scroll from '../base/scroll.vue'
  import Navigation from '../base/Navigation.vue'
  import {getTrainKinds, getTrainDateAndID} from '../httprequest/api'
  import {setUserId, getUserId} from '../httprequest/userdefault'

  export default {
    components: {
      Navigation,
      Scroll,
      IEcharts
    },
    data() {
      return {
        counts:0,//记录网络请求的成功数量,因为这里</IEcharts>组件的option是异步获取的，而且</IEcharts>在v-for循环内部，所以要用一个标志位，等待数据全部加载完毕，再加载</IEcharts>组件
        canshow:false,
        color: ['#E0022B', '#E09107', '#A3E00B'],
        title: "主页",
        train_kinds_arr: [],//
        /*
        * train_kinds_arr = [{
        *         name:"背部训练",
        *         train_days:[["2017-10-12", 1],["2017-10-13", 1]],
        *         rain_kind:1
        *      },
        *     {
        *       },
        *     {
        *       }]
        * */
        probeType: 3,
        listenScroll: true,
        loading: false,

      }
    },
    methods: {
      getOptions(index){
        console.log("当前index",index)
        console.log("this.train_kinds_arr[index].name",this.train_kinds_arr[index].name)
        console.log("this.color[this.random()",this.color[this.random()])
        console.log("this.getCurrentYearMonth()",this.getCurrentYearMonth())
        console.log("this.train_kinds_arr[index].train_days",this.train_kinds_arr[index].train_days)
        console.log("\n,\n")
       var bar = {
          title: {
            text: this.train_kinds_arr[index].name+'日历图'
          },
          tooltip: {},
          visualMap: {
            type: "piecewise",
              show: true,
              pieces: [
              {value: 1, label: '训练日', color: this.color[this.random()]},
            ],
          },
          calendar: {
            range: this.getCurrentYearMonth(),
              orient: 'vertical',
              dayLabel: {
              nameMap: 'cn'
            },
            monthLabel: {
              nameMap: 'cn'
            },
            yearLabel: {
              show: false
            },
            width: "65%",
              height: "120px"
          },
          series: {
            type: 'heatmap',
              coordinateSystem: 'calendar',
              data: this.train_kinds_arr[index].train_days
          }
        }
        return bar
      },
      FormatDate(strTime) {
        let date = new Date(strTime);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      },
      getCurrentYearMonth(){
        let myDate = new Date();
        myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        myDate.getMonth(); //获取当前月份(0-11,0代表1月)
        return myDate.getFullYear() + "-" + (myDate.getMonth() + 1)
      },
      random() {//随机取1～3的整数
        return Math.floor(Math.random() * 3)
      },
      onReady(instance) {
        console.log(instance);
      },
      onClick(event, instance, echarts) {
        console.log(arguments);
      },
      scroll(pos) {
        this.scrollY = pos.y
//        console.log("当前滚动位置是:", pos.y)
      },
      pushSetting() {
        console.log('显示setting页面')
        this.$router.push('/home/setting')
      }
    },
    props: {
      param: {}
    },
    computed: {},
    watch: {


    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },

    mounted() {
      getTrainKinds(getUserId()).then(res => {
        if (res.code == 200) {
          let arr = []
          let dataCounts  =  res.data.length
          console.log("dataCounts=",dataCounts)
          for (let obj of res.data) {
            getTrainDateAndID(getUserId(), obj.train_kind).then(res => {
              let timeArr = []
              let a;
              for (let obj2 of res.data){
                a = [this.FormatDate(obj2.cteate_time),1]
                timeArr.push(a)
              }
              console.log("最终包装的日期:",timeArr)

              obj.train_days = timeArr
              this.counts++
              console.log("this.counts=",this.counts)
              if (this.counts == dataCounts){
                console.log("相等了",dataCounts,this.counts)
                this.canshow = true
              }
            })

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
          console.log("arr是",arr)

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
    .listview {
      position: absolute;
      top: 64px;
      bottom: 0;
      left: 0;
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
          width: 90%;
          height: 200px;
          margin: 0 auto;
        }
      }
    }
  }
</style>
