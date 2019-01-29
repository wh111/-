<!----------------------------------
****--@name     t_router
****--@role     ${*}
****--@date     2018/5/4
****--@author   zzh
----------------------------------->
<template>
  <div class="homepage">
    <router-view/>
    <div>
      <div style="height: 0.7rem;"></div>
      <ul class="navigation" style="box-sizing: border-box;padding: 0 0.9rem;">
        <li @click="change('tTeam')" :class="(type === 'tClass') || (type === 'tGroup')?'active':''">
          <div>
            <span class="glyphicon glyphicon-home"></span>
          </div>
          <div :class="(type === 'tClass') || (type === 'tGroup')?'active1':''">班组</div>
        </li>
        <li @click="change('tMine')" :class="type === 'tMine'?'active':''">
          <div class="glyphicon glyphicon-user"></div>
          <div :class="type === 'tMine'?'active1':''">我的</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import '../../tools/bootstrap-3.3.7-dist/css/bootstrap.css'
// 当前组件引入全局的util
// let Util = null;
export default {
  data () {
    return {
      type: ''
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    change (index) {
      this.$router.push({
        name: index
      })
    }
  },
  created () {
    this.init()
    let local = location.href.split('/')
    local = local[local.length - 1]
    this.type = local
    //			console.log(local)
  },
  watch: {
    $route (to, from) {
      //				console.log(to.name)
      this.type = to.name
    }
  }
}
</script>
<style lang="scss">
  @import '../../css/homepage';
</style>
