<template>
  <div class="cont">
    <div class="demo">
      <h1 class="title" :class="{success:success}">XNote</h1>
      <div class="login" ref="login">
        <div class="login__check"></div>
        <div class="login__form">
          <div :class="{login__row_up:!isLogin}" class="zhengti">
            <div class="login__row" >
              <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
                <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8"/>
              </svg>
              <input type="text" v-model="username" class="login__input name" placeholder="Username"/>
            </div>
            <div class="login__row" >
              <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
                <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0"/>
              </svg>
              <input type="password" v-model="password" class="login__input pass" placeholder="Password"/>
            </div>
            <transition name="bounce">
            <div class="login__row" v-show="!isLogin" >
              <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
                <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0"/>
              </svg>
              <input type="password" v-model="password2" class="login__input pass" placeholder="Password"/>
            </div>
            </transition>
          </div>
          <button type="button" class="login__submit" :class="{processing:procing,success:success}" @click="submitclick"
                  ref="login__submit">{{btnText}}
          </button>
          <p class="login__signup" @click="signUp" v-html="hint"></p>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import 'jquery'
  import {regist, login} from '../httprequest/api'
  import {setUserId,getUserId} from '../httprequest/userdefault'

  export default {
    components: {},
    data() {
      return {
        hint: "没有账号? &nbsp;<a>注册一个</a>",
        btnText: '登  入',
        isLogin: true,
//        isRegister:false,
        username: '',
        password: '',
        password2: '',
        procing: false,
        success: false,
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
      submitclick() {
        if(this.isLogin){
          this.procing = true;
          var that = this;
          login(this.username, this.password).then((res) => {
            if (res.code == 200) {
              setTimeout(() => {
                that.success = true
                setUserId(res.user_id)
                setTimeout(()=>{
                  this.$router.push('/home')
                },500)
              }, 400)
            } else {
              that.procing = false;
//              alert
              this.$Message.error("登入失败")
            }
            console.log("登入:", res)
          })
        }else{
          if(this.password === this.password2){
            regist(this.username, this.password).then((res) => {
              if (res.code == 200) {
                setTimeout(() => {
                  console.log("that.procing=",this.procing)
//                  alert()
                  this.$Message.success(res.msg);
                  this.procing = false
                }, 500)
              } else {
                that.procing = false;
//                alert()
                this.$Message.error("注册失败");

              }
              console.log("登入:", res)
            })
          }else{
//            alert()
            this.$Message.error("两次输入密码不一致");
          }
        }

      },
      signUp() {
        this.isLogin = !this.isLogin

      }
    },
    props: {
      param: {}
    },
    computed: {},
    watch: {
      isLogin(newValue) {
        if (newValue === false) {
//          this.isRegister = false
          this.btnText = "注    册"
          this.hint = "已有账号? &nbsp;<a>立刻登入</a>"

//          $(".zhengti").animate({transform: 'translate3D(0,80px,0)'});
//          $(".zhengti").animate({left: '+=80px'});

        } else {
//          this.isRegister = true
          this.btnText = "登    入"
          this.hint = "没有账号? &nbsp;<a>注册一个</a>"
//          $(".zhengti").animate({transform: 'translate3D(0,-80px,0)'});
        }

      }
    },
    mounted() {
      if(getUserId().length!==0){
        this.$router.push('/home')
      }
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
