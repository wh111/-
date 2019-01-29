<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2018/4/23
****--@author   zzh
----------------------------------->
<template>
  <div class="appraisal">
    <header-title>
      <slot>{{$route.query.name||'自适应测评'}}</slot>
    </header-title>
    <div class="stance"></div>
    <router-view/>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import AppraisalMath from './appraisal/appraisal_math'
import HeaderTitle from './header'
// 当前组件引入全局的util
// let Util = null;
export default {
  data () {
    return {
      changes: 'appraisal_math',
      subjectList: [],
      active: ''
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      if(this.$store.state.envs){
        this.subjectList = this.$store.state.envs.gradeMap[this.$store.state.loginInfo.grade]
      }

    },
    change (index) {
      this.active = index
      console.log(this.active)
      //      this.$router.push({name: index})
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
  components: {AppraisalMath, HeaderTitle}
}
</script>
<style lang="scss">
  @import "../../css/appraisal";
</style>
