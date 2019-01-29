<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/24
****--@author   zzh
----------------------------------->
<template>
  <div class="pExamine">
    <header-title>
      <slot><div class="txt">北京市昌平一中七年级联考</div></slot>
    </header-title>
    <div class="stance"></div>
    <div>
      <div class="over_footer">单选题</div>
      <ul class="singleChoice"  style="text-align: center">
        <li v-for="index in 18" :key="index" @click="open">{{index}}</li>
      </ul>
      <div class="over_footer">判断退</div>
      <ul class="singleChoice">
        <li v-for="index in 6" :key="index">{{index}}</li>
      </ul>
      <div class="over_footer">问答题</div>
      <ul class="singleChoice">
        <li v-for="index in 12" :key="index">{{index}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import HeaderTitle from '../header'
// 当前组件引入全局的util
let Util = null
export default {
  data () {
    return {
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    open () {
      this.$router.push({name: 'pTopic'})
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  components: {HeaderTitle}
}
</script>
<style lang="scss">
  @import '../../../pcss/patriarch/pExamine';
</style>
