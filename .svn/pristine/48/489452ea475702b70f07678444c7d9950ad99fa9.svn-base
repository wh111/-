<!----------------------------------
****--@name     pQuestion_content
****--@role     ${*}
****--@date     2018/5/2
****--@author   zzh
----------------------------------->
<template>
  <div class="questionGradeContent">
    <header-title>
      <slot>商品详情</slot>
    </header-title>
    <div class="stance"></div>
    <div class="headerImg">
      <img src="../../../../sasmobile/img/30_02.jpg" alt="">
      <div class="headerImg_tab">
        <div style="color: #424242;font-weight: bold">价格￥99.0</div>
        <div @click="open" class="active">立刻购买</div>
      </div>
      <div class="headerImg_content">
        <div>
          <h3>商品介绍</h3>
          <div>
            本书处处体现薛金星先生终生学习的理念，不仅教会学生知识，
            更主要的是教会学生学习方法。通过阅读本书，您可以把平时的
            点滴学习同中考紧密联系起来，从开始学习化学就能体验中考真
            题，学会解答中考真题的方法。
          </div>
        </div>
        <div>
          <h3>商品内容</h3>
          <div>
            本书处处体现薛金星先生终生学习的理念，不仅教会学生知识，
            更主要的是教会学生学习方法。
          </div>
        </div>
        <div>
          <h3>商品目标</h3>
          <div>
            本书处处体现薛金星先生终生学习的理念，不仅教会学生知识，
            更主要的是教会学生学习方法。
          </div>
        </div>
        <div>
          <h3>商品优势</h3>
          <div>
            本书处处体现薛金星先生终生学习的理念，不仅教会学生知识，
            更主要的是教会学生学习方法。
          </div>
        </div>
      </div>
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
    change (type) {
      this.type = type
    },
    open () {
      this.$router.push({name: 'buy'})
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
  @import '../../../css/question_child/questionGradeContent';
</style>
