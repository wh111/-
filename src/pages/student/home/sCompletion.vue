<!----------------------------------
****--@name     sCompletion
****--@role
****--@date     2018/5/8/008
****--@author   zzh
----------------------------------->
<template>
  <div class="recentPractice_next_question">
    <swiper height="5.5rem" class="agag">
      <swiper-item class="black" v-for="(item,index) in showQuestion" :key="index">
        <div class="last_question">
          <div class="question_header">
            <h3>{{item}}</h3>
            <span>还有<span>9</span>题</span>
          </div>
          <div class="question_sidebar">
            <span>题型</span><span>填空题</span>
          </div>
          <div class="question_content" style="font-size: 0.15rem;padding:  0.15rem 0.1rem;width: 3.45rem;height: 1.1rem;">
            有16朵花，每4朵扎成一束，可以扎<input type="text" class="sCompletionInp"/>束。
          </div>
        </div>
        <div>
          <x-button style="height: 0.4rem;font-size: 0.18rem" :gradients="['#FF5E3A', '#FF9500']" @click.native="open">确定</x-button>
        </div>
        <div v-transfer-dom>
          <confirm v-model="show"
                   title="确认退出？"
                   @on-cancel="onCancel"
                   @on-confirm="onConfirm"
                   @on-show="onShow"
                   @on-hide="onHide" class="showMoudel">
            <p style="text-align:center;">题库里还有未完成的题目，是否确认
              退出做题？</p>
          </confirm>
        </div>
      </swiper-item>
    </swiper>

  </div>
</template>
<script>
/* 当前组件必要引入 */

// 当前组件引入全局的util
let Util = null
export default {
  data: function () {
    return {
      show: false,
      showQuestion: ['第一题', '第二题', '第三题']
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
    },
    open () {
      this.show = true
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
  @import '../../../css/home/recentPractice_next/recentPractice_next_question';
  .showMoudel{
    .weui-mask{
      background: rgba(0, 0, 0, 0.2);
    }
  }
  .agag > div.vux-indicator.vux-indicator-right > a > i {
    display: none;
  }
  .sCompletionInp{
    width: 0.45rem;
    height: 0.25rem;
    background: #F5F5F5;
    border: 1px solid gainsboro;
    margin: 0 0.05rem;
  }
</style>
