<script src="../store/getters.js"></script>
<template>
  <div class="pagecontainer">
    <navigation :title="title"></navigation>
    <!--<scroll :data="train_kinds_arr"-->
    <!--class="listview"-->
    <!--ref="listview">-->
    <Cascader :data="data" v-model="value1" style="z-index: 101;position: absolute;"></Cascader>
    <div class="chart1" v-if="canshow" v-show="canshow">
      <IEcharts v-if="canshow" v-show="canshow" :option="options" :loading="chartsLoading" @ready="onReady"
                @click="onClick"></IEcharts>
    </div>
    <div class="chart2">
      <IEcharts v-if="canshow2" v-show="canshow2" :option="options2" :loading="chartsLoading" @ready="onReady"
                @click="onClick"></IEcharts>
    </div>
    <div class="chart3">
      <IEcharts v-if="canshow3" v-show="canshow3" :option="options3" :loading="chartsLoading" @ready="onReady"
                @click="onClick"></IEcharts>

    </div>
    <!--</scroll>-->
    <p>详细记录页面
      训练部位train_kind是：{{$route.params.partid}}</p>
  </div>
</template>

<script>
  import IEcharts from 'vue-echarts-v3/src/full.vue';
  import Scroll from '../base/scroll.vue'
  import navigation from '../base/Navigation.vue'
  import {getTrainKinds, getTrainDateAndID, getTrainContrast, getTrainNameByID} from '../httprequest/api'
  import {
    setUserId,
    getUserId,
    storageLocalAllDataThisYear,
    getStorageLocalAllDataThisYear
  } from '../httprequest/userdefault'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    components: {
      navigation,
      Scroll,
      IEcharts
    },
    data() {
      return {
        color: ['#E0022B', '#E09107', '#A3E00B', '#c23531', '#61a0a8', '#d48265', '#91c7ae', '#ca8622', '#546570', '#c4ccd3'],

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
        value1: ["0"],
        title: '详情',
        probeType: 3,
        loading: false,
        train_kinds_arr: [],
        chartsLoading: false,
        canshow: false,
        canshow2: false,
        canshow3: false,
        options: {},
        options2: {},
        options3: {}
      }
    },
    methods: {
      onClick() {

      },
      onReady() {

      },
      //index 0年记录 ,1柱形图  , 2
      getOptions() {
        let option;
        let dateList = this.getAllDataThisYear()
        let lunarData = dateList.map(item => [item, 1])
        option = {
          title: {
            top: 10,
            left: 'center',
            text: this.getThisYear() + '年'
          },
          tooltip: {},

          visualMap: {
            type: "piecewise",
            show: true,
            top: "10",
            right: '10',
            pieces: [
              {gt: 2, label: '休息日', color: "white"},
              {value: 1, label: '训练日', color: "lightskyblue"},
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
            top: "70px",
            left: "center",
            width: "60%",
            range: this.getThisYear(),
            itemStyle: {
              normal: {borderWidth: 0.5}
            },
            yearLabel: {show: false}
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
            data: this.train_kinds_arr,
            tooltip: {
              formatter: function (params) {
                return params.value[0];
              },
            }
          }]
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
      //获取本年度所有日期:["2017-01-01","2017-01-02","2017-01-03"....]
      getAllDataThisYear() {
        let data = this.getAllYearsData
        if (data.length > 0) {
          return data
        } else {
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
          this.setAllYearsData({data: results})
//          console.log("this.allYearsData",this.getAllYearsData)
          return results;
        }
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
      ...mapActions([
        'setAllYearsData',
      ]),
      unique(arr) {
        // n为hash表，r为临时数组
        let n = {}, r = [];
        for (let i = 0; i < arr.length; i++) {
          // 如果hash表中没有当前项
          if (!n[arr[i]]) {
            // 存入hash表
            n[arr[i]] = true;
            // 把当前数组的当前项push到临时数组里面
            r.push(arr[i]);
          }
        }
        return r;
      }
    },
    props: {
      param: {}
    },
    computed: {
      ...mapGetters([
        'getAllYearsData'
      ])
    },
    watch: {
      value1(n, o) {
        let parsrIntN = parseInt(n)
        this.options = this.getOptions(parsrIntN)
        switch (parsrIntN) {
          case 0:
            this.canshow = true
            this.canshow2 = false
            this.canshow3 = false
            break;
          case 1:
            this.canshow = false
            this.canshow2 = true
            this.canshow3 = false
            break;
          case 2:
            this.canshow = false
            this.canshow2 = false
            this.canshow3 = true
            break;
        }
        console.log("this.options=", this.options)
      }
    },
    mounted() {
      getTrainDateAndID(getUserId(), this.$route.params.partid).then(res => {
        let timeArr = []
        let a;
        for (let obj2 of res.data) {
          a = [this.FormatDate(obj2.cteate_time), 1]
          timeArr.push(a)
        }
        this.train_kinds_arr = timeArr
        this.options = this.getOptions()
        this.canshow = true
      }).catch(res => {
        this.$Message.error("网络错误")
      })

      getTrainContrast(getUserId(), this.$route.params.partid).then(res => {
        let oldarr = res.data//原数组
        let arr = []//存放train_name_id的数组
        for (let obj of oldarr) {
          arr.push(obj.train_name_id)
        }
        //数组去重复
        let newarr = this.unique(arr)
        let result = []//用一个新数组保存最终结果
        for (let i = 0; i < newarr.length; i++) {
          let trainid = newarr[i];
          let count = 0;//计数，动作的次数，之后循环累加得出总数
          for (let obj of oldarr) {
            if (trainid === obj.train_name_id) {
              count = count + obj.counts
            }
          }
          result.push({"train_name_id": trainid, "counts": count})
        }
//        for (let obj of result){
//          getTrainNameByID(obj.train_name_id).then(res => {
//            console.log("id是", res.data)
//            obj.train_name = res.data[0].train_name
//          })
//        }

        console.log("result.map(item=>item.counts)", result)
        let option = {
          title: {
            text: '动作对比'
          },
          tooltip: {},
          xAxis: {
            position: 'top'
          },
          width: "80%",
          yAxis: {
            data: result.map(item => item.train_name_id)
          },
          series: [{
            type: 'bar',
            data: result.map(item => item.counts)
          }]
        };
        this.options2 = option;
//        console.log("最后结果是:", result)
      }).catch(res => {
        this.$Message.error("网络错误")
      })
    }
  }
</script>

<style lang="less" scoped>
  .pagecontainer {
    position: absolute;
    z-index: 1;
    top: 20px;
    left: 0;
    height: 1200px;
    right: 0;
    background: white;
    .chart1 {
      height: 1200px;
    }
    .chart2 {
      height: 1000px;
    }
    /*.listview {*/
    /*height: 100%;*/
    /*position: absolute;*/
    /*top: 64px;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*!*overflow: hidden;*!*/
    /*}*/
    /*.vue-echarts{*/
    /*height:2000px;*/
    /*}*/
    /*.mycharts {*/
    /*height: 2000px;*/
    /*}*/
  }
</style>
