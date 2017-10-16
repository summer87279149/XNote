<template>
  <div class="pagecontainer">
    <navigation :title="title"></navigation>
    <scroll :data="train_kinds_arr"
            class="listview"
            ref="listview">
      <Cascader :data="data" v-model="value1" style="z-index: 101;position: absolute;"></Cascader>
      <div class="mycharts">
        <IEcharts v-show="canshow" :option="getOptions()" :loading="chartsLoading" @ready="onReady"
                  @click="onClick"></IEcharts>
      </div>
    </scroll>
    <p>详细记录页面
      训练部位train_kind是：{{$route.params.partid}}</p>
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
        color: ['#E0022B', '#E09107', '#A3E00B', '#c23531', '#61a0a8', '#d48265', '#91c7ae', '#ca8622', '#546570', '#c4ccd3'],
        canshow: true,
        data: [{
          value: '0',
          label: '训练记录',
        }, {
          value: '1',
          label: '动作统计'
        }, {
          value: '2',
          label: '往期记录对比'
        }
        ],
        value1: [],
        title: '详情',
        probeType: 3,
        loading: false,
        train_kinds_arr: [],
        chartsLoading: false
      }
    },
    methods: {
      onClick() {

      },
      onReady() {

      },
      getOptions() {
        let dateList = this.getAllDataThisYear()
        let lunarData = [];
        for (let i = 0; i < dateList.length; i++) {
          lunarData.push([
            dateList[i],
            1
          ]);
        }
        let option = {
          title: {
            top: 10,
            left: 'center',
            text: '训练记录'
          },
          tooltip: {},
          visualMap: {
            type: "piecewise",
            show: true,
            top: "10",
            right: '10',
            pieces: [
              {gt: 2, label: '休息日', color: "white"},
              {value: 1, label: '训练日', color: this.color[this.random()]},
            ],
          },
          calendar: {
            dayLabel: {
              nameMap: 'cn'
            },
            monthLabel: {
              nameMap: 'cn'
            },
            orient: 'vertical',
            top: 70,
            left: "center",
            width: "60%",
            range: this.getThisYear(),
            itemStyle: {
              normal: {borderWidth: 0.5}
            },
            yearLabel: {show: false}
          },
          series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: this.getAllDataThisYear()
          }
        };
        return option
      },
      random() {//随机取整数
        return Math.floor(Math.random() * 10)
      },
      getThisYear() {
        let dateinstance = new Date()
        return dateinstance.getFullYear()
      },
      getAllDataThisYear() {
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
        return results;
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
  .pagecontainer {
    position: fixed;
    z-index: 100;
    top: 20px;
    left: 0;
    bottom: 0;
    right: 0;
    background: deepskyblue;
    .listview {
      /*height: 100%;*/
      position: absolute;
      top: 64px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    .mycharts {
      height: 2000px;
    }
  }
</style>
