<template>
  <div>
    <ul ref="container">
      <li class="xiong" :class="{gray:isGray0,jump:!isGray0}" @click="click(0)"><span :class="{liuguang:!isGray0}">胸</span></li>
      <li class="bei" :class="{gray:isGray1,jump:!isGray1}" @click="click(1)"> <span :class="{liuguang:!isGray1}">背</span></li>
      <li class="tun" :class="{gray:isGray2,jump:!isGray2}" @click="click(2)"><span :class="{liuguang:!isGray2}">臀腿</span></li>
      <li class="fu" :class="{gray:isGray3,jump:!isGray3}" @click="click(3)"><span :class="{liuguang:!isGray3}">腰腹</span></li>
      <li class="ertou" :class="{gray:isGray4,jump:!isGray4}" @click="click(4)"><span :class="{liuguang:!isGray4}">肩臂</span></li>
      <li class="paobu" :class="{gray:isGray5,jump:!isGray5}" @click="click(5)"><span :class="{liuguang:!isGray5}">有氧</span></li>
    </ul>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        isGray0:true,
        isGray1:true,
        isGray2:true,
        isGray3:true,
        isGray4:true,
        isGray5:true,
        current:0,
      }
    },
    methods: {
      click(e){
        console.log(this.isGray3)
        switch (e) {
          case 0:
            this.isGray0 = !this.isGray0
            this.isGray1 = true;
            this.isGray2 = true;
            this.isGray3 = true;
            this.isGray4 = true;
            this.isGray5 = true;
            this.current = 0;
            break;
          case 1:
            this.isGray0 = true
            this.isGray1 = false;
            this.isGray2 = true;
            this.isGray3 = true;
            this.isGray4 = true;
            this.isGray5 = true;
            this.current = 1;
            break;
          case 2:
            this.isGray0 = true
            this.isGray1 = true;
            this.isGray2 = false;
            this.isGray3 = true;
            this.isGray4 = true;
            this.isGray5 = true;
            this.current = 2;
            break;
          case 3:
            this.isGray0 = true
            this.isGray1 = true;
            this.isGray2 = true;
            this.isGray3 = false;
            this.isGray4 = true;
            this.isGray5 = true;
            this.current = 3;
            break;
          case 4:
            this.isGray0 = true
            this.isGray1 = true;
            this.isGray2 = true;
            this.isGray3 = true;
            this.isGray4 = false;
            this.isGray5 = true;
            this.current = 4;
            break;
          case 5:
            this.isGray0 = true
            this.isGray1 = true;
            this.isGray2 = true;
            this.isGray3 = true;
            this.isGray4 = true;
            this.isGray5 = false;
            this.current = 5;
            break;
        }
        this.$emit('clickCallback',e)
      }
    },
    props: {

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
      for (let i of this.$refs.container.children) {
        let width2 = document.body.clientWidth / 7;
        i.style.height = width2 + 'px'
        i.style.width = width2 + 'px'
        i.style.lineHeight = width2 + 'px'
        i.style.borderRadius = width2/2 + 'px'
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
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
  }

  ul > li {
    text-align: center;
    display: inline-block;
    width: 15px;
    color: white;
    font-weight: 500;
    font-size: 17px;
  }
  .liuguang{
    text-align: center;
    background-image: -webkit-linear-gradient(left, white, deepskyblue );
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    animation: stream 0.5s  linear;
    background-size: 200% 100%;
  }
  .gray{
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
  }
  .jump{
    border: 1px deepskyblue solid;
    box-shadow:0px 0px 8px deepskyblue;
    animation: jumpAnimation 0.5s ease-out;
    -moz-animation:jumpAnimation 0.5s ease-out; /* Firefox */
    -webkit-animation:jumpAnimation 0.5s ease-out; /* Safari and Chrome */
    color:deepskyblue;
  }


  @keyframes stream {
    0%  {
      background-position: 0 0;
    }
    100% {
      background-position: -120% 0;
    }
  }
  @-webkit-keyframes stream {
    0%  {
      background-position: 0 0;
    }
    100% {
      background-position: -120% 0;
    }
  }

  /*弹跳动画*/
  @keyframes jumpAnimation {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(0px, -10px);
    }

    100% {
      transform: translate(0px, 0px);
    }
  }
  @-moz-keyframes  jumpAnimation{
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(0px, -10px);
    }

    100% {
      transform: translate(0px, 0px);
    }
  }
  @-webkit-keyframes jumpAnimation {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(0px, -10px);
    }

    100% {
      transform: translate(0px, 0px);
    }
  }
  .xiong{
    background: url('../assets/xiong.jpeg') no-repeat center;
    background-size: 100%;
   }
  .bei{
    background: url('../assets/bei.jpg') no-repeat center;
    background-size: 100%;
  }
  .tun{
    background: url('../assets/tun.jpg') no-repeat center;
    background-size: 100%;
  }
  .fu{
    background: url('../assets/fu.jpg') no-repeat center;
    background-size: 100%;
  }
  .ertou{
    background: url('../assets/ertou.jpg') no-repeat center ;
    background-size: 100%;
  }
  .paobu{
    background: url('../assets/paobu.jpg') no-repeat center ;
    background-size: 100%;
  }
</style>
