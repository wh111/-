<!----------------------------------
****--@name     swiper
****--@role     ${*}
****--@date     2018/4/24
****--@author   zzh
----------------------------------->
<template>
  <div class="swiperView">
    <swiper height="5.5rem" class="agag">
      <swiper-item class="black" v-for="index in 3" :key="index">
        <slot></slot>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
/* 当前组件必要引入 */

// 当前组件引入全局的util
let Util = null
export default {
  props: ['name'],
  data: function () {
    return {
      showQuestion: ''
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
    },
    open () {
      this.show1 = true
    },
    onCancel () {
      console.log('on cancel')
    },
    onConfirm (msg) {
      console.log('on confirm')
      if (msg) {
        alert(msg)
      }
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    change (index) {
      this.show = index
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  components: {}
}
</script>
<style lang="scss">
  .agag > div.vux-indicator.vux-indicator-right > a > i {
    display: none;
  }
</style>
