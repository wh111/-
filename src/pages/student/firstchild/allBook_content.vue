<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/24
****--@author   zzh
----------------------------------->
<template>
  <div class="allBook_content">
    <header-title>
      <slot>商品详情</slot>
    </header-title>
    <div class="stance"></div>
    <div class="content" v-for="(item,index) in data" :key="index">
      <div>
        <img src="../../../../sasmobile/img/1_07.jpg"/>
      </div>
      <div class="homePage_book">
        <div>{{item.title}}</div>
        <div><span>{{item.price}}</span><span>{{item.number}}</span></div>
      </div>
    </div>

    <div class="footer">
      <div v-for="(item,index) in contents" :key="index" class="homePage_footer">
        <span>{{item.title}}</span><span>{{item.price}}</span>
      </div>
    </div>
    <input class="footer_input" type="submit" value="立刻支付"/>
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
      data: [
        {url: '../../../sasmobile/img/1_07.jpg', title: '三年高考五年模拟练习', price: '试卷', number: '50套'}
      ],
      contents: [
        {title: '订单金额', price: '￥199.00'},
        {title: '优惠', price: '5折'},
        {title: '订单金额', price: '￥199.00'},
        {title: '优惠', price: '5折'},
        {title: '订单金额', price: '￥199.00'},
        {title: '优惠', price: '5折'}
      ],
      commonList: [ 'China', 'Japan', 'America' ]
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    change (val, label) {
      console.log('change', val, label)
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
  @import '../../../css/child/allBook_content';
</style>
