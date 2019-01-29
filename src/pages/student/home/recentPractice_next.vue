<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/24
****--@author   zzh
----------------------------------->
<template>
  <div class="recentPractice_next">
    <header-title>
      <slot>{{$route.query.title}}</slot>
    </header-title>
    <div class="stance"></div>
    <!--<div class="tab_click">-->
      <!--<div @click="change('recentPractice_next_question')">题版</div>-->
      <!--<div @click="change('recentPractice_next_note')">笔记</div>-->
      <!--<div @click="change('recentPractice_next_collect')">收藏</div>-->
    <!--</div>-->
    <router-view/>

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
    change (types) {
      this.$router.push({name: types})
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
  @import '../../../css/home/recentPractice_next';
</style>
