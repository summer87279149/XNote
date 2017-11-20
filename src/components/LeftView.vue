<template>
    <div class="container">
      <ul class="tableview">
        <li class="cell1"  v-show=false>
          <p class="name">用户名</p>
          <p v-text="+getname()"></p>
        </li>
        <li class="cell" @click="actionManage">动作管理</li>
        <li class="cell">关于XNote</li>
        <li class="cell" @click="logOut">退出登入</li>
      </ul>
      <div @click="clickTransprant()" v-show="transprant" class="transprant" ></div>
    </div>
</template>

<script>
  import {setUserId, getUserId} from '../httprequest/userdefault'
    export default {
        components: {},
        data() {
            return {
              transprant:false
            }
        },
        methods: {
          actionManage(){
            this.$router.push({ path: '/home/label' })
          },
          logOut(){
            setUserId(null)
            this.$router.push({ path: '/login' })
          },
          getname(){
//            console.log('getUserId=',getUserId())
            return getUserId()
          },
          dismiss(){
            this.$router.push({ path: '/home' })
          },
          clickTransprant(){
//            alert(2)/
            this.transprant = false
            setTimeout(()=>{
              this.$router.push({ path: '/home' })
            },200)
//
          }
        },
        props: {
            name: {
              default:'未知用户'
            }
        },
        computed: {},
        watch: {},
        beforeCreate() {
        },
        mounted(){
          setTimeout(()=>{
            this.transprant = true
          },350)
        }

    }
</script>

<style lang="less" scoped>
.container{
  position: fixed;
  z-index: 100;
  top: 20px;
  left: 0;
  bottom: 0;
  right: 70%;
  background: deepskyblue;
  .tableview{
    list-style: none;
    margin-top:20px;
    .cell1{
      display: block;
      height: 60px;
      border-bottom: 1px lightgrey solid;
      color: white;
      line-height: 30px;
      .name{
        font-size: 14px;
      }
    }
    .cell{
      display: block;
      height: 44px;
      border-bottom: 1px lightgrey solid;
      font-size: 14px;
      color: white;
      line-height: 44px;
    }
  }
  .transprant{
    position: fixed;
    z-index: 100;
    top: 20px;
    left: 30%;
    bottom: -100px;
    right:-100px;
    background: rgba(48,48,48,0.04);
  }
}
</style>
