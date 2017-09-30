<template>
  <div class="cont">
    <div class="demo">
      <h1 class="title">XNote</h1>
      <div class="login" ref="login">
        <div class="login__check"></div>
        <div class="login__form">
          <div class="login__row">
            <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
              <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
            </svg>
            <input type="text" v-model="username" class="login__input name" placeholder="Username"/>
          </div>
          <div class="login__row">
            <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
              <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
            </svg>
            <input type="password" v-model="password" class="login__input pass" placeholder="Password"/>
          </div>
          <button type="button" class="login__submit" :class="{processing:procing,success:success}" @click="submitclick" ref="login__submit">Sign in</button>
          <p class="login__signup">Don't have an account? &nbsp;<a>Sign up</a></p>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

  import {regist,login} from '../httprequest/api'
  import {setUserId} from '../httprequest/userdefault'
    export default {
        components: {},
        data() {
            return {
              username:'',
              password:'',
              procing:false,
              success:false,
            }
        },
        methods: {
          ripple(elem, e) {
            $(".ripple").remove();
            var elTop = elem.offset().top,
              elLeft = elem.offset().left,
              x = e.pageX - elLeft,
              y = e.pageY - elTop;
            var $ripple = $("<div class='ripple'></div>");
            $ripple.css({top: y, left: x});
            elem.append($ripple);
          },
          submitclick(){
            this.procing = true;
            var that = this
            login(this.username,this.password).then((res)=>{
              if(res.code == 200){
                setTimeout(()=>{
                  setUserId(res.user_id)
                  that.success = true
                },500)
              }else {
                that.procing = false;
                alert("登入失败")
              }
              console.log("登入:",res)
            })
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
  @import "../common/css/style.css";

</style>
