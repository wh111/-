<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/23
****--@author   zzh
----------------------------------->
<template>
  <div class="pMyorder">
    <header-title>
      <slot>我的订单</slot>
    </header-title>
    <div class="stance"></div>
    <ul class="pMyorder_navigation" style="padding: 0.075rem 0.275rem ">
      <li @click="change('all')" :class="changes==='all' ? 'active' : ''">全部</li>
      <li @click="change('non-payment')" :class="changes==='non-payment' ? 'active' : ''">未付款</li>
      <li @click="change('paccomplish')" :class="changes==='paccomplish' ? 'active' : ''">已完成</li>
      <li @click="change('canceled')" :class="changes==='canceled' ? 'active' : ''">已取消</li>
    </ul>
    <div class="stance"></div>
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
      changes: 'all'
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    change (index) {
      // this.changes = index;
      this.$router.push({name: index})
    }
  },
  created () {
    this.init()
    let local = location.href.split('/')
    local = local[local.length - 1]
    this.changes = local
    console.log(local)
  },
  watch: {
    $route (to, from) {
      this.changes = to.name
      // console.log(to.name)
    }
  },
  mounted () {
  },
  components: {HeaderTitle}
}
</script>
<style lang="scss">
  @import "../../../pcss/pMine/pMyOrder";
</style>
