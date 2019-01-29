<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/27
****--@author   zzh
----------------------------------->
<template>
    <div style="height: 0;overflow: hidden">
        <ul class="hello_header">
            <li @click="back">
                <x-icon type="ios-arrow-back" size="0.3rem"></x-icon>
                <div>返回</div>
                <div>关闭</div>
            </li>
            <li>
                <slot></slot>
            </li>
            <li>
                <div></div>
                <div></div>
                <div></div>
            </li>
        </ul>
    </div>
</template>
<script>
  /* 当前组件必要引入 */
  import api from '../login/api'
  // 当前组件引入全局的util
  // let Util = null
  export default {
    props:['notgo'],//是否返回上个路由
    data () {
      return {}
    },
    methods: {
      // 初始化请求列表数据
      init () {
        console.log(this.$slots.default[0].text)
        this.setTitle(this.$slots.default[0].text)
      },
      back () {
        if(this.notgo){
          this.$emit('notGoResult')
          return
        }
        console.log(2)
        this.$router.go(-1)
      },
    },

    created () {
      this.init()
    },
    mounted () {
    },
    components: {},
//    watch:{
//      '$route' (to, from) {
//        console.log(to,from)
////        this.$router.go(1)
//      }
//    },
  }
</script>
<style lang="scss">
    @import '../../css/header';
</style>
