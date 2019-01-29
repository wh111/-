<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/27
****--@author   zzh
----------------------------------->
<template>
    <div>
      <ul class="hello_header">
        <li @click="back">
          <x-icon type="ios-arrow-back" size="0.3rem"></x-icon>
          <div>返回</div>
          <!--<div>关闭</div>-->
        </li>
        <li style="text-align: center"><slot></slot></li>
        <li>
          <div></div><div></div><div></div>
        </li>
      </ul>
    </div>
</template>
<script>
/* 当前组件必要引入 */
import api from '../login/api'
// 当前组件引入全局的util
let Util = null
export default {
  data () {
    return {
      currRole:'STUDENT'
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.setTitle(this.$slots.default[0].text)
    },
    back () {
      this.$router.go(-1)
    },


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
  @import '../../css/header';
</style>
