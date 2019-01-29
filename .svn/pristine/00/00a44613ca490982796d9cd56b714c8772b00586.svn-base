<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/23
****--@author   zzh
----------------------------------->
<template>
  <div class="appraisal_math_open">
    <header-title>
      <slot>自适应测评</slot>
    </header-title>
    <div class="stance"></div>
    <ul class="navigation">
      <li @click="change('appraisal_math_open_math')" :class="changes==='appraisal_math_open_math' ? 'active' : ''">数学</li>
      <li @click="change('appraisal_math_open_language')" :class="changes==='appraisal_math_open_language' ? 'active' : ''">语文</li>
      <li @click="change('appraisal_math_open_english')" :class="changes==='appraisal_math_open_english' ? 'active' : ''">英语</li>
      <li @click="change('appraisal_math_open_history')" :class="changes==='appraisal_math_open_history' ? 'active' : ''">历史</li>
      <li @click="change('appraisal_math_open_geography')" :class="changes==='appraisal_math_open_geography' ? 'active' : ''">地理</li>
    </ul>
    <div class="stance"></div>
    <router-view></router-view>
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
      changes: 'appraisal_math_open_math'
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    change (index) {
      this.$router.push({name: index})
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  watch: {
    $route (to, from) {
      //				console.log(to.name)
      this.changes = to.name
    }
  },
  components: {HeaderTitle}
}
</script>
<style lang="scss">
  @import "../../../css/appraisal/appraisal_math_open";
</style>
