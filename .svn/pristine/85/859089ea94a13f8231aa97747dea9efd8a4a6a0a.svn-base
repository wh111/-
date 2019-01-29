<!----------------------------------
****--@name     tBasic
****--@role     ${*}
****--@date     2018/5/8
****--@author   zzh
----------------------------------->
<template>
    <div class="tBasic">
      <div class="tHomeworkBook">基础设置</div>
      <flexbox justify="space-between" wrap="wrap" :gutter="0" class="tBasicHeader">
        <flexbox-item :span="6" class="tBlack">作业名称</flexbox-item>
        <flexbox-item :span="6" align="right" class="tGray">输入名称</flexbox-item>
        <flexbox-item :span="6" class="tBlack">布置时间</flexbox-item>
        <flexbox-item :span="6" align="right" class="tGreen">立刻发布</flexbox-item>
        <flexbox-item :span="6" class="tBlack">上交时间</flexbox-item>
        <flexbox-item :span="6" align="right" class="tGreen">3月14日 13:00</flexbox-item>
      </flexbox>
      <div class="tHomeworkBook">防舞弊设置</div>
      <checklist title="" :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist>
      <div class="tHomeworkBook">发布设置</div>
      <flexbox justify="space-between" wrap="wrap" :gutter="0" class="tBasicHeader">
        <flexbox-item :span="6" class="tBlack">发布到</flexbox-item>
        <flexbox-item :span="6" align="right" class="tGreen">初三一班</flexbox-item>
      </flexbox>
    </div>
</template>
<script>
/* 当前组件必要引入 */

// 当前组件引入全局的util
// let Util = null
export default {
  data () {
    return {
      commonList: ['题目顺序随机', '题目候选项随机'],
      radioValue: ['题目顺序随机']
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
  components: {}
}
</script>
<style lang="scss">
  @import "../../../tcss/tBasic";
</style>
