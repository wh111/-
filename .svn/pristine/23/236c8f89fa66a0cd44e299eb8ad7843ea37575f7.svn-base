<!----------------------------------
****--@name     tQuestion
****--@role     ${*}
****--@date     2018/5/8
****--@author   zzh
----------------------------------->
<template>
    <div class="tQuestion">
      <div class="tHomeworkBook">题型</div>
      <ul class="tQuestionHeader" v-for="(item,index) in data" :key="index">
        <li class="tQuestionLeft">
          <div>{{item}}</div>
          <p>共210道</p>
        </li>
        <li>输入选题数目</li>
      </ul>
    </div>
</template>
<script>
/* 当前组件必要引入 */

// 当前组件引入全局的util
// let Util = null
export default {
  data () {
    return {
      data: ['单选题', '多选题', '判断题']
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {

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
  @import "../../../tcss/tQuestion";
</style>
