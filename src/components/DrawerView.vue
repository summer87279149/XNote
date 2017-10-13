<template>
  <transition name="slide">
    <Leftview ></Leftview>
  </transition>
</template>

<script>
  import Leftview from './LeftView.vue'

  export default {
    components: {
      Leftview
    },
    data() {
      return {
        msg: '我是模版消息'
      }
    },
    methods: {},
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
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(-100%, 0, 0);
  }

</style>
