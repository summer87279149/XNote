<template>
  <div class="container">

    <keep-alive>
      <Navigation :title="title" :showbackbtn="false" :showaddbtn="true" :showSetting="true" @showSetting="pushSetting"
                  @adda="addAction">
      </Navigation>
    </keep-alive>
    <scroll
            :listen-scroll="listenScroll"
            :probe-type="probeType"
            :data="train_kinds_arr"
            class="listview"
            ref="listview">
      <ul class="tableview">
        <li class="cell" v-for="(item,index) in train_kinds_arr">
          <div class="header">
            <p class="title">{{item.name}}</p>
            <div class="detailbtn" @click.prevent="pushToDetail(item)">查看详情 >
            </div>
          </div>
          <div class="contentview">
            <IEcharts v-if="canshow" :option="getOptions(index)" :loading="chartsLoading" @ready="onReady"
                      @click="onClick"></IEcharts>
          </div>
        </li>
      </ul>
    </scroll>
    <Spin v-show="loading" fix>
      <Icon type="load-c" size=18      class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <router-view></router-view>
  </div>
</template>

<script>
  import IEcharts from 'vue-echarts-v3/src/full.vue';
  import Scroll from '../base/scroll.vue'
  import Navigation from '../base/Navigation.vue'
  import {getTrainKinds, getTrainDateAndID} from '../httprequest/api'
  import {
    setUserId,
    getUserId,
    storageLocalAllDataThisYear,
    getStorageLocalAllDataThisYear
  } from '../httprequest/userdefault'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    components: {
      Navigation,
      Scroll,
      IEcharts
    },
    data() {
      return {
        counts: 0,//记录网络请求的成功数量,因为这里</IEcharts>组件的option是异步获取的，而且</IEcharts>在v-for循环内部，所以要用一个标志位，等待数据全部加载完毕，再加载</IEcharts>组件
        canshow: false,
        color: ['#E0022B', '#E09107', '#A3E00B', '#c23531', '#61a0a8', '#d48265', '#91c7ae', '#ca8622', '#546570', '#c4ccd3'],
        title: "主页",
        train_kinds_arr: [],//
        /*
        * train_kinds_arr = [{
        *         name:"背部训练",
        *         train_days:[["2017-10-12", 1],["2017-10-13", 1]],
        *         train_kind:1
        *      },
        *     {
        *       },
        *     {
        *       }]
        * */
        probeType: 3,
        listenScroll: true,
        loading: true,
        chartsLoading: true,
      }
    },
    methods: {
      pulldowna() {
        this.$forceUpdate();
      },
      pushToDetail(item) {
        if (item) {
//          this.$router.push({name: 'detail', params: {partid: item.train_kind}})
          this.$router.push({path: '/home/detail/' + item.train_kind})
        }
      },
      addAction() {
        this.$router.push({path: '/actionmanage'})
      },
      getOptions(index) {
//        console.log("this.train_kinds_arr[index].train_days", this.train_kinds_arr[index].train_days)
        let dateList = this.getAllDataThisYear()
        let lunarData = [];
        for (let i = 0; i < dateList.length; i++) {
          lunarData.push([
            dateList[i],
            1
          ]);
        }
//        console.log("当前index",index)
//        console.log("this.train_kinds_arr[index].name",this.train_kinds_arr[index].name)
//        console.log("this.color[this.random()",this.color[this.random()])
//        console.log("this.getCurrentYearMonth()",this.getCurrentYearMonth())
//        console.log("this.train_kinds_arr[index].train_days",this.train_kinds_arr[index].train_days)
//        console.log("\n,\n")
        let bar = {
          title: {
            text: "本月" + this.train_kinds_arr[index].name + '记录图',
            textStyle: {
              fontSize: 15,
            }
          },
          tooltip: {},
          visualMap: {
            type: "piecewise",
            show: true,
            pieces: [
              {gt: 2, label: '休息日', color: "white"},
              {value: 1, label: '训练日', color: "lightskyblue"},
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
          series: [{
            type: 'scatter',//
            coordinateSystem: 'calendar',
            symbolSize: 1,
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  let d = new Date(params.value[0]);
                  return d.getDate();
                },
                textStyle: {
                  color: '#000'
                }
              }
            },
            data: lunarData
          }, {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: this.train_kinds_arr[index].train_days,
            tooltip: {
              formatter: function (params) {
//                  console.log("tooltip字符=",params)
//                  let d = new Date(params.value[0]);
                return params.value[0];
              },
            }
          }]
        }
        return bar
      },
      //获取本年度所有日期:["2017-01-01","2017-01-02","2017-01-03"....]
      getAllDataThisYear() {
        var y;
        let data = this.getAllYearsData
//        console.log("data,",y)
//        console.log("data=",data)
//        alert(y)
        if (data.length>0) {
          console.log("走快捷方法")
          return data
        } else {
//           y = this.getThisYear()
          function getDate(datestr) {
            let temp = datestr.split("-");
            let mydate = new Date(temp[0], temp[1], temp[2]);
            return mydate;
          }

          let dateinstance = new Date()
          let start = dateinstance.getFullYear() + "-" + "00-01"
          let end = (dateinstance.getFullYear() + 1) + "-" + "00-01"
          let startTime = getDate(start);
          let endTime = getDate(end);
          let results = []
          while ((endTime.getTime() - startTime.getTime()) >= 0) {
            let year = startTime.getFullYear();
            let month = startTime.getMonth().toString().length == 1 ? "0" + startTime.getMonth().toString() : startTime.getMonth();
            let day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
//          console.log("循环天数:",year+"-"+(parseInt(month)+1)+"-"+day)
            let dataStr = year + "-" + (parseInt(month) + 1) + "-" + day
            results.push(dataStr)
            startTime.setDate(startTime.getDate() + 1);
          }
//          console.log("results=",results)
          this.setAllYearsData({data:results})
//          console.log("this.allYearsData",this.getAllYearsData)
          return results;
        }
      },
      getThisYear() {
        let dateinstance = new Date()
        return dateinstance.getFullYear()
      },
      FormatDate(strTime) {
        let date = new Date(strTime);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      },
      getCurrentYearMonth() {
        let myDate = new Date();
        myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        myDate.getMonth(); //获取当前月份(0-11,0代表1月)
        return myDate.getFullYear() + "-" + (myDate.getMonth() + 1)
      },
      random() {//随机取整数
        return Math.floor(Math.random() * 10)
      },
      onReady(instance) {
        this.chartsLoading = false
      },
      onClick(event, instance, echarts) {
      },

      pushSetting() {
        this.$router.push('/home/setting')
      },
      ...mapActions([
        'setAllYearsData',
      ])
    },
    props: {
      param: {}
    },
    computed: {
      ...mapGetters([
        'getAllYearsData'
      ])
    },
    watch: {},
    created() {
      this.probeType = 3
      this.listenScroll = true
    },

    mounted() {
      getTrainKinds(getUserId()).then(res => {
        if (res.code == 200) {
          let arr = []
          let dataCounts = res.data.length
          for (let obj of res.data) {
            getTrainDateAndID(getUserId(), obj.train_kind).then(res => {
//              console.log("res++",res)
              let timeArr = []
              let a;
              for (let obj2 of res.data) {
                a = [this.FormatDate(obj2.cteate_time), 1]
                timeArr.push(a)
              }
              obj.train_days = timeArr
              this.counts++
              if (this.counts == dataCounts) {
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
          this.loading = false
        } else {
        }
      }).catch((err) => {
        this.$Message.error("网络不正常");
        this.loading = false
      });
    }
  }
</script>

<style lang="less" scoped>
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }

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
        background-color: rgba(245, 245, 246, 1);
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
