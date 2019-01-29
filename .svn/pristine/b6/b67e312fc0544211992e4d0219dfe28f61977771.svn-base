<!----------------------------------
****--@name     tMistakes
****--@role     ${*}
****--@date     2018/5/7
****--@author   zzh
----------------------------------->
<template>
  <div class="tAppraisalContent">
    <header-title>第一单元测验</header-title>
    <div class="stance"></div>
    <swiper height="5.5rem" class="agag">
      <swiper-item class="black" v-for="(item,index) in showQuestion" :key="index">
        <div class="tAppraisalContentHeader">
          <div class="question_header" style="position: relative">
            <h3>{{item}}</h3>
            <div class="shows" style="display: none">已加入易错题库</div>
          </div>
          <div class="question_sidebar">
            <span>单选题</span>
            <span @click="open" style="margin-left: 1.6rem;color:rgba(136,171,218,1);">加入易错题</span>
            <span style="margin-left: 0.2rem;color:rgba(136,171,218,1);">加入难题</span>
          </div>
          <div class="question_content">
            李大伯有一片果林，共80棵果树，某日，李大伯
            开始采摘今年第一批成熟的果子，他随机选 取2
            棵果树共摘得果子，质量分别为（单位：kg）：
            0.28，0.26，0.24，0.23，0.25，0.24，0.26，
            0.26，0.25，0.23，以此计算，李大伯收获的这
            批果子的单个质量和总质量分别约为（    ）
          </div>
          <div class="question_footer">
            <div>
              <span style="color: #3F3F3F">正确答案：B</span>
              <span style="color: #3F3F3F;margin-right: 0.65rem">TA的答案：B</span>
            </div>
            <div>
          <span style="color: #F08565">解析：数学学习最重要的是熟练双向推导思维的训练,即正向推导思
          维和逆向推导思维双管齐下.鉴于数学题目总是有题干和问题两个部
          分组成,前者给出条件。</span>
            </div>
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import HeaderTitle from '../header'
// 当前组件引入全局的util
// let Util = null
export default {
  data () {
    return {
      showQuestion: ['第一题', '第二题', '第三题']
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      // $(".show").hide()

    },
    open () {
      var Time = null
      $('.shows').show()
      Time = setTimeout(function () {
        $('.shows').fadeOut(500)
      }, 2000)
    }
  },
  created () {
    this.init()
    $('.show').hide()
  },
  mounted () {},
  components: {
    HeaderTitle
  }
}
</script>
<style lang="scss">
  @import '../../../tcss/tAppraisalContent';
  .agag > div.vux-indicator.vux-indicator-right > a > i {
    display: none;
  }
  .shows{
    display: none;
    color: #FFFFFF;
    width: 1.6rem;
    height: 0.23rem;
    line-height: 0.23rem;
    background: #1AAD19;
    border-radius: 0.2rem;
    box-sizing: border-box;
    padding-left: 0.09rem;
    position: absolute;
    left: 1.075rem;
    color:rgba(255,255,255,0.8);
    font-size: 0.12rem;
  }
</style>
