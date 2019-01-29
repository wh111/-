<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/24
****--@author   zzh
----------------------------------->
<template>
  <div id="all">
    <div class="content" v-for="(item,index) in data" :key="index">
      <div>
        <img src="../../../../../sasmobile/img/1_07.jpg"/>
      </div>
      <div class="homePage_book">
        <div>{{item.title}}</div>
        <div><span>{{item.paper}}</span><span>{{item.numbers}}</span></div>
        <p>{{item.content}}</p>
        <p>{{item.prices}}</p>
        <button class="btns" @click="open">{{item.type}}</button>
      </div>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */

// 当前组件引入全局的util
let Util = null
export default {
  data () {
    return {
      data: [
        {url: '../../../sasmobile/img/1_07.jpg', title: '三年高考五年模拟练习', price: '价格', number: '￥99.00', paper: '试卷', numbers: '50套', content: '订单号：201755322363', prices: '￥99.00', type: '已完成'},
        {url: '../../../sasmobile/img/1_07.jpg', title: '三年高考五年模拟练习', price: '价格', number: '￥99.00', paper: '试卷', numbers: '50套', content: '订单号：201755322363', prices: '￥99.00', type: '去支付'},
        {url: '../../../sasmobile/img/1_07.jpg', title: '三年高考五年模拟练习', price: '价格', number: '￥99.00', paper: '试卷', numbers: '50套', content: '订单号：201755322363', prices: '￥99.00', type: '已取消'},
        {url: '../../../sasmobile/img/1_07.jpg', title: '三年高考五年模拟练习', price: '价格', number: '￥99.00', paper: '试卷', numbers: '50套', content: '订单号：201755322363', prices: '￥99.00', type: '已完成'},
        {url: '../../../sasmobile/img/1_07.jpg', title: '三年高考五年模拟练习', price: '价格', number: '￥99.00', paper: '试卷', numbers: '50套', content: '订单号：201755322363', prices: '￥99.00', type: '已完成'},
        {url: '../../../sasmobile/img/1_07.jpg', title: '三年高考五年模拟练习', price: '价格', number: '￥99.00', paper: '试卷', numbers: '50套', content: '订单号：201755322363', prices: '￥99.00', type: '已完成'}
      ]
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    open () {
      this.$router.push({name: 'all_content'})
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
  @import '../../../../pcss/pMine/all';
</style>
