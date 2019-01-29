<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/23
****--@author   zzh
----------------------------------->
<template>
  <div class="myOrder">
    <header-title>
      <slot>我的订单</slot>
    </header-title>
    <div class="stance"></div>
    <ul class="navigation" style="padding: 0.075rem 0.2rem ;background: #fff;z-index: 100">
      <li @click="change('allBook','','')" :class="changes==='allBook' ? 'active' : ''">全部</li>
      <li @click="change('non_payment','0','0')" :class="changes==='non_payment' ? 'active' : ''">未付款</li>
      <li @click="change('accomplish','1','0')" :class="changes==='accomplish' ? 'active' : ''">已完成</li>
      <li @click="change('cancel','2','0')" :class="changes==='cancel' ? 'active' : ''">已取消</li>
      <li @click="change('censOrder','','1')" :class="changes==='censOrder' ? 'active' : ''">积分订单 </li>
    </ul>
    <div style="clear: both"></div>
   <router-view/>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import HeaderTitle from '../header'

// 当前组件引入全局的util
// let Util = null;
export default {
  data () {
    return {
      changes: 'allBook'

    }
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    change (index, val, orderTypes) {
      this.changes = index
      this.$router.push({name: 'allBook', query: {status: val, orderTypes: orderTypes,type:index}})
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  watch:{
    '$route'(to,from){
      this.changes=this.$route.query.type||'allBook'
    }
  },
  components: {HeaderTitle}
}
</script>
<style lang="scss">
  @import "../../../css/child/myOrder";
</style>
