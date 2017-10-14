<template>
  <transition name="slide">
    <DetailPage></DetailPage>
  </transition>
</template>

<script>
  import DetailPage from './DetailPage.vue'

  export default {
    components: {
      DetailPage
    },
    data() {
      return {}
    },
    methods: {},
    props: {
      param: {}
    },
    computed: {},
    watch: {},
    mounted() {
    }
  }
</script>

<style scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
